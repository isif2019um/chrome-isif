// Copyright (c) 2017 NetBlocks Project <https://netblocks.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const assert = require('assert');
global.Promise = require('bluebird');
const braces = require('braces');
const _ = require('lodash');
const WhoisIP = require('./check');

// export DEBUG=whois-rdap
var whois = new WhoisIP();
// Disable caching
whois.ttl_secs = 0;

//const ips_ipv4 = ['157.240.1.35', '104.244.42.1', '216.58.212.142', '193.0.6.139', '178.242.154.5', '178.242.154.7'];
//const ips_ipv6 = ['2001:67c:2e8:22::c100:68b'];
//const ips_ipv4 = ['1.33.44.55','118.179.212.66','118.179.212.67','118.179.212.68'];
//const ips_ipv4 = ['118.179.212.66'];
const ips_ipv4 = ['157.240.1.35'];

async function testStability (range) {
  var ips = braces.expand(range);
  var results = await Promise.mapSeries(ips, ip => whois.check(ip));

  // assert that canonicalization has worked and all object_id are equal
  const o = results[0];
  _.each(results, r => {
    assert(r.object_id.toString() === o.object_id.toString());
    assert(_.isEqual(r.rdap, o.rdap));
  })

/*
  var groups = _.groupBy(results, r => r.object_id.toString());
  console.log(groups);
  assert(Object.keys(groups).length === 1);
*/

/*
  var matching = _.filter(results, r => r.object_id && r.object_id.toString() === results[0].object_id.toString());
  assert(matching.length === results.length);
*/
}

/*
// TODO: test error synthesis
// https://github.com/arineng/nicinfo/issues/21
// https://rdap.db.ripe.net/ip/81.92.203.83
*/

async function testBasic () {
  var res;
  res = await whois.check(ips_ipv4[0]);
  //console.log(JSON.stringify(res.rdap, null, '  '));
  console.log(res.object_id);
  console.log(res.rdap.name);
  console.log(res.rdap.handle);
  // TODO: Test that revalidating raised validatedAt field

  // empty object for special-purpose addresses
  res = await whois.checkOne('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
  assert(JSON.stringify(res) === '{}');
  res = await whois.checkOne('192.168.1.1');
  assert(JSON.stringify(res) === '{}');

  // Test specificity
  res1 = res = await whois.check('8.8.0.0/16');
  assert(res.rdap.name === "LVLT-ORG-8-8");
  res2 = res = await whois.check('8.8.8.8');
  assert(res.rdap.name === 'LVLT-GOGL-8-8-8');
  res3 = res = await whois.check('8.8.8.0/24');
  assert(res.rdap.name === 'LVLT-GOGL-8-8-8');
  assert(res2.object_id.toString() === res3.object_id.toString());

  // TODO: test that 8.8.8.8/24 = invalid syntax
}

async function runTests () {
  await testBasic();
  await testStability('104.244.42.{1..4}');
  await testStability('157.240.1.{35..39}');
}

// TODO: Proper testing.
whois.connect()
.then(() => {
})
.then(runTests)
.finally(() => {
  if (whois.client)
    return whois.client.close();
});

function checkNotices() {
// Known to be issued by LACNIC
  var rdap = {
    "notices" : [{ "title" : "Rate Limit Notice", "description" : [ "Rate Limit is maxed at 10 queries per 1 minutes." ] }]
  };
  var notice = _.find(rdap.notices, (n) => n.title === 'Rate Limit Notice');
  if (notice)
    console.log(notice);
}