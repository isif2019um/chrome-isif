class UI{
    constructor(){
        const showIP = document.getElementById('showIP');
    }
    
    displayASN(message){

        const div = document.createElement('div');
        div.className = 'col-5';
        const container = document.querySelector('.displayIP');
        const beforeThis = document.querySelector('#shopIP');
        container.appendChild(document.createTextNode(message));
        container.insertBefore(div.beforeThis);
        
    }

    displayResult(res){
        console.log(res);
        let ip = document.getElementById('txtIP').value;
        let startAddress, endAddress, handle, parentHandle='Not Found', name;
        let type, port43, version, country='Not Found';
        let notices;
        let noticeOutput='No notice available';
        let remarks, remarkOutput='No remark available';
        let entities, entityOutput='No entity available';
        let events, eventsOutput='No event available';
        let links, linksOutput='No link available';
        let mainEvents, mainEventsOutput="No event available";
        let mainLinks, mainLinksOutput="No link available";
        let arinASN, arinASNOutput="Not available";
        let blocks, blocksOutput="Group not available";
        let statuses, statusesOutput="Status not available";

        // iterate the value of the ip
        for (var key of Object.keys(res)) {
            
            //const expr = key;
            switch (key) {
            case 'handle':
                handle = res[key];
                break;
            case 'parentHandle':
                parentHandle = res[key];
                break;
            case 'name':
                name = res[key];
                break;
            case 'status':
                  statuses = res[key];
                  statusesOutput ='';
                  statuses.forEach(element => {
                    statusesOutput += element + '<br>';
                  });
                  
                  break;
            case 'type':
                type = res[key];
                break;
            case 'startAddress':
                startAddress = res[key];
                break;
            case 'ipVersion':
                version = res[key];
                break;
            case 'endAddress':
                endAddress = res[key];
                break;
            case 'port43':
                port43 = res[key];
                break;
            case 'country':
                country = res[key];
                break;
            case 'arin_originas0_originautnums':
                  arinASN = res[key];
                  arinASNOutput ='';
                  arinASN.forEach(element => {
                    arinASNOutput +=element+"<br>";
                            
                  });
                break;
            
            
            case 'cidr0_cidrs':
                  blocks = res[key];
                  blocksOutput ='';
                  blocks.forEach(element => {
                    
                    blocksOutput += element.v4prefix + '/' + element.length;
                  });
                  
                  break;
            
            case 'notices':
                notices = res[key];
                noticeOutput ='';
                notices.forEach(element => {
                    
                    //console.log(element);
                    //var obj = { first: "John", last: "Doe" };
                    // Visit non-inherited enumerable keys
                    
                    Object.keys(element).forEach(function(notice) {
                        switch (notice) {
                            case 'title':
                                noticeOutput += '<b>' + element[notice] + '</b>';
                                break;
                            case 'description':
                                noticeOutput += '<br>' + element[notice][0] + '<br>';
                                break;
                            default:    
                        }
                    });
                     
                });
                
                break;
            case 'remarks':
                remarks = res[key];
                remarkOutput ='';
                remarks.forEach(element => {
                
                    // Visit non-inherited enumerable keys
                    let remark;
                    Object.keys(element).forEach(function(remark) {
                        switch (remark) {
                          case 'title':
                            remarkOutput += '<br><b>' + element[remark] + '</b>';
                            break;

                          case 'description':
                                remarkOutput += element[remark][0] + '<br>';
                                break;
                          
                                     
                            default:    
                        }
                    });
                        
                });
                
                break;
            case 'events':
                  mainEvents = res[key];
                  mainEventsOutput ='';
                  mainEvents.forEach(element => {
                  
                      // Visit non-inherited enumerable keys
                      let mainEvent;
                      Object.keys(element).forEach(function(mainEvent) {
                          switch (mainEvent) {
                            case 'eventAction':
                              mainEventsOutput += '<b>' + element[mainEvent] + '</b><br>';
                              break;
  
                            case 'eventDate':
                              mainEventsOutput += element[mainEvent] + '<br>';
                              break;
                         
                            default:    
                          }
                      });
                          
                  });
                  
                  break;
              case 'links':
                    mainLinks = res[key];
                    mainLinksOutput ='';
                    mainLinks.forEach(element => {
                    
                        // Visit non-inherited enumerable keys
                        //let mainLink;
                        Object.keys(element).forEach(function(mainLink) {
                            switch (mainLink) {
                              case 'href':
                                  mainLinksOutput += '<b> href: </b>' + element[mainLink] + '<br>';
                                  break;
                              case 'rel':
                                  mainLinksOutput += '<b> rel: </b> ' + element[mainLink] + '<br>';
                                  break;
                              case 'type':
                                  mainLinksOutput += '<b> type: </b> ' + element[mainLink] + '<br>';
                                  break;
                              case 'value':
                                  let value = element[mainLink];
                                  let valArray = value.split('/');
                                  ip = valArray[valArray.length-1];
                                  mainLinksOutput += '<b> value: </b> ' + value + '<br><br>';
                                  break;     
                           
                              default:    
                            }
                        });
                            
                    });
                    
                    break;          
            case 'entities':
                entities = res[key];
                entityOutput='';
                let entityNumber=0;
                entities.forEach(element => {
                    entityNumber++;
                    entityOutput +="<b>Entity Number: "+entityNumber+"</b>";
                    // Visit non-inherited enumerable keys
                    let entity;
                    Object.keys(element).forEach(function(entity) {
                        switch (entity) {
                            case 'events':
                                events = element[entity];
                                eventsOutput = '';
                                //console.log(events.length);
                                events.forEach(element => {
                                    //console.log('i am in event');
                                    // Visit non-inherited enumerable keys
                                    let event;
                                    Object.keys(element).forEach(function(event) {
                                        switch (event) {
                                            case 'eventAction':
                                                eventsOutput += '<b>' + element[event] + '</b><br>';
                                                break;
                                            case 'eventDate':
                                                eventsOutput += element[event] + '<br>';
                                                break;
                                            
                                            default:    
                                        }
                                    });
                                        
                                });

                                //entityOutput += "<hr><b>Event list</b><br>"+ eventsOutput;  
                                break;
                            
                            case 'links':
                                links = element[entity];
                                linksOutput='';
                                //console.log(events.length);
                                links.forEach(element => {
                                    //console.log('i am in event');
                                    // Visit non-inherited enumerable keys
                                    let event;
                                    Object.keys(element).forEach(function(link) {
                                        switch (link) {
                                            case 'href':
                                                linksOutput += '<b> href: </b>' + element[link] + '<br>';
                                                break;
                                            case 'rel':
                                                linksOutput += '<b> rel: </b> ' + element[link] + '<br>';
                                                break;
                                            case 'type':
                                                linksOutput += '<b> type: </b> ' + element[link] + '<br>';
                                                break;
                                            case 'value':
                                                linksOutput += '<b> value: </b> ' + element[link] + '<br>';
                                                break;        
                                            
                                            default:    
                                        }
                                    });
                                        
                                });

                                //entityOutput += "<hr><b>Link list</b><br>"+ linksOutput;  
                                break;    
                            case 'handle':
                                entityOutput += '<br><b>Handle:</b> ' + element[entity] + '<br>';
                                break;
                            case 'objectClassName':
                                entityOutput += '<br><b>Object Class Name:</b> ' + element[entity] + '<br>';
                                break;
                            
                            default:    
                        }
                    });
                   entityOutput +="<hr><b>Event list</b><br>" + eventsOutput + "<hr><b>Link list</b><br>"+ linksOutput;     
                });
                
                break;                                  
            default:
                
            }
                        
        }
        let output = `
        <h3>Search Result</h3>
        <div class="card bg-info text-white mt-2 mb-3">
            <div class="card-header">IP: ${ip} [${version}]</div>
        </div>
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">
              <p class="card-text">
                <div class="table-responsive">  
                <table class="table table-hover">
                    <tbody>
                      <tr>
                        <th scope="row">Net Range</th>
                        <td>${startAddress} - ${endAddress} </td>
                      </tr>
                         
                      <tr>
                        <th scope="row">ASN</th>
                        <td>${arinASNOutput}</td>
                      </tr> 
                      <tr>
                        <th scope="row">Netname</th>
                        <td>${name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Country</th>
                        <td>${country}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td>${statusesOutput}</td>
                      </tr>
                      <tr>
                        <th scope="row">Type</th>
                        <td>${type}</td>
                      </tr>
                      <tr>
                        <th scope="row">Block</th>
                        <td>${blocksOutput}</td>
                      </tr>
                      <tr>
                        <th scope="row">Handle</th>
                        <td>${handle}</td>
                      </tr>
                      <tr>
                        <th scope="row">Parent</th>
                        <td>${parentHandle}</td>
                      </tr>
                      <tr>
                        <th scope="row">Port 43 Whois</th>
                        <td>${port43}</td>
                      </tr>
                      <tr>
                        <th scope="row">Events</th>
                        <td>${mainEventsOutput}</td>
                      </tr>
                      <tr>
                        <th scope="row">Links</th>
                        <td>${mainLinksOutput}</td>
                      </tr>
                      <tr>
                        <th scope="row">Notices</th>
                        <td>${noticeOutput}</td>
                      </tr>
                      <tr>
                        <th scope="row">Remarks</th>
                        <td>${remarkOutput}</td>
                      </tr>
                      <tr>
                        <th scope="row">Entities</th>
                        <td>${entityOutput}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </p>
            </div>
        </div>
 <!--   <div class="card bg-light mb-3">
            <div class="card-header">Entity Informations</div>
            <div class="card-body">
              
              <p class="card-text">
                <div class="table-responsive">  
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr class="bg-light text-info">
                                <th colspan="2">ENTRY No 1</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Kind</th>
                            <td>Org</td>
                          </tr>
                          <tr>
                            <th scope="row">Full Name</th>
                            <td>Google LLC</td>
                          </tr>
                          <tr>
                            <th scope="row">Handle</th>
                            <td>GOGL</td>
                          </tr>
                          <tr>
                            <th scope="row">Address</th>
                            <td>1600 Amphitheatre Parkway
                                Mountain View
                                CA
                                94043
                                United States</td>
                          </tr>
                          <tr>
                            <th scope="row">Roles</th>
                            <td>Registrant</td>
                          </tr>
                          <tr>
                            <th scope="row">Registration</th>
                            <td>Thu, 30 Mar 2000 05:00:00 GMT (Thu Mar 30 2000 local time)</td>
                          </tr>
                          <tr>
                            <th scope="row">Last Changed</th>
                            <td>Thu, 31 Oct 2019 19:45:45 GMT (Fri Nov 01 2019 local time)</td>
                          </tr>
                          <tr>
                            <th scope="row">Comments</th>
                            <td>Please note that the recommended way to file abuse complaints are located in the following links.
                                To report abuse and illegal activity: https://www.google.com/contact/
                                For legal requests: http://support.google.com/legal
                                Regards,
                                The Google Team</td>
                          </tr>
                          <tr>
                              <th scope="row">Self</th>
                              <td>https://rdap.arin.net/registry/entity/GOGL</td>
                          </tr>
                          <tr>
                            <th scope="row">Alternate</th>
                            <td>https://whois.arin.net/rest/org/GOGL</td>
                        </tr>
                          <tr>
                            <th scope="row">Port 43 Whois</th>
                            <td>whois.apnic.net</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

              </p>

              
              <p class="card-text">
                <div class="table-responsive">  
                    <table class="table table-hover table-bordered">
                        <tbody>
                          <thead>
                                <tr class="bg-light text-info">
                                    <th colspan="2">ENTRY No 2</th>
                                </tr>
                          </thead>
                          <tr>
                            <th scope="row">Kind</th>
                            <td>Group</td>
                          </tr>
                          <tr>
                            <th scope="row">Full Name</th>
                            <td>Abuse</td>
                          </tr>

                          <tr>
                            <th scope="row">Handle</th>
                            <td>ABUSE5250-ARIN</td>
                          </tr>
                          <tr>
                            <th scope="row">Email</th>
                            <td>network-abuse@google.com</td>
                          </tr>
                          <tr>
                            <th scope="row">Telephone</th>
                            <td>+1-650-253-0000</td>
                          </tr>
                          <tr>
                            <th scope="row">Organization</th>
                            <td>Abuse</td>
                          </tr>
                          
                          <tr>
                            <th scope="row">Address</th>
                            <td>1600 Amphitheatre Parkway
                                Mountain View
                                CA
                                94043
                                United States</td>
                          </tr>
                          <tr>
                            <th scope="row">Roles</th>
                            <td>Registrant</td>
                          </tr>
                          <tr>
                            <th scope="row">Registration</th>
                            <td>Thu, 30 Mar 2000 05:00:00 GMT (Thu Mar 30 2000 local time)</td>
                          </tr>
                          <tr>
                            <th scope="row">Last Changed</th>
                            <td>Thu, 31 Oct 2019 19:45:45 GMT (Fri Nov 01 2019 local time)</td>
                          </tr>
                          <tr>
                            <th scope="row">Comments</th>
                            <td>Please note that the recommended way to file abuse complaints are located in the following links.
                                To report abuse and illegal activity: https://www.google.com/contact/
                                For legal requests: http://support.google.com/legal
                                Regards,
                                The Google Team</td>
                          </tr>
                          <tr>
                            <th scope="row">Unvalidated POC</th>
                            <td>ARIN has attempted to validate the data for this POC, but has received no response from the POC since 2019-10-24</td>
                        </tr>
                          
                        <tr>
                              <th scope="row">Self</th>
                              <td>https://rdap.arin.net/registry/entity/GOGL</td>
                        </tr>
                          <tr>
                            <th scope="row">Alternate</th>
                            <td>https://whois.arin.net/rest/org/GOGL</td>
                        </tr>
                          <tr>
                            <th scope="row">Port 43 Whois</th>
                            <td>whois.apnic.net</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

              </p>
            </div>
        </div> -->
        `;

        document.getElementById('result').innerHTML=output;
    }

    displayASNResult(res){
        console.log(res);
        let ip = document.getElementById('txtIP').value;
        let name='Not available';
        let description_short= "Not available";
        // let "description_full": [],
        let country_code="Not available";
        let website="Not available";
        //"email_contacts": [],
        //"abuse_contacts": [],
        let looking_glass= 'Not available';
        let traffic_estimation= "Not available";
        let traffic_ratio="Not available";
        // "owner_address": [],
        // "rir_allocation": {},
        // "iana_assignment": {},
        let date_updated= "Not available";


        for (var key of Object.keys(res)) {
            
          //const expr = key;
          switch (key) {
          case 'name':
              name = res[key];
              break;
          case 'description_short':
                description_short = res[key];
                break;
          case 'country_code':
            country_code = res[key];
            break;
          case 'website':
            website = res[key];
              break;          
          case 'looking_glass':
            looking_glass = res[key];
            break;
          case 'traffic_estimation':
            traffic_estimation = res[key];
                break;
          case 'traffic_ratio':
            traffic_ratio = res[key];
            break;
          case 'date_updated':
            date_updated = res[key];
              break;  
          case 'default':    
          }
        };
        
        let output =
        `        <h3>Search Result</h3>
        <div class="card bg-info text-white mt-2 mb-3">
            <div class="card-header">Organization: ${name}</div>
        </div>
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">
              <p class="card-text">
                <div class="table-responsive">  
                <table class="table table-hover">
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        <td>${name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Short Description</th>
                        <td>${description_short}</td>
                      </tr>
                      <tr>
                        <th scope="row">Country Code</th>
                        <td>${country_code}</td>
                      </tr>
                      <tr>
                        <th scope="row">Website</th>
                        <td>${website}</td>
                      </tr>
                      <tr>
                        <th scope="row">Looking Glass</th>
                        <td>${looking_glass}</td>
                      </tr>
                      <tr>
                        <th scope="row">Traffic Estimation</th>
                        <td>${traffic_estimation}</td>
                      </tr>
                      <tr>
                        <th scope="row">Traffic Ratio</th>
                        <td>${traffic_ratio}</td>
                      </tr>
                      <tr>
                        <th scope="row">Updated Date</th>
                        <td>${date_updated}</td>
                      </tr>
                         
                      
                    </tbody>
                  </table>
                </div>
              </p>
            </div>
        </div> 
        `;
        document.getElementById('result').innerHTML=output;
    }
}