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
        let noticeOutput;
        let remarks, remarkOutput;
        let entities, entityOutput;
        let events, eventsOutput;
        let links, linksOutput;

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
            case 'notices':
                notices = res[key];
                notices.forEach(element => {
                    
                    
                    //var obj = { first: "John", last: "Doe" };
                    // Visit non-inherited enumerable keys
                    let notice;
                    Object.keys(element).forEach(function(notice) {
                        switch (notice) {
                            case 'title':
                                noticeOutput += '<br><b>' + element[notice] + '</b>';
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
                remarks.forEach(element => {
                
                    // Visit non-inherited enumerable keys
                    let remark;
                    Object.keys(element).forEach(function(remark) {
                        switch (remark) {
                            case 'description':
                                remarkOutput += '<br>' + element[remark][0] + '<br>';
                                break;
                            case 'title':
                                remarkOutput += '<br><b>' + element[remark] + '</b>';
                                break;
                            
                            default:    
                        }
                    });
                        
                });
                
                break;
            case 'entities':
                entities = res[key];
                let entityNumber=0;
                entities.forEach(element => {
                    entityNumber++;
                    entityOutput +="<hr><h5>Entity Number: "+entityNumber+"<h5>";
                    // Visit non-inherited enumerable keys
                    let entity;
                    Object.keys(element).forEach(function(entity) {
                        switch (entity) {
                            case 'events':
                                events = element[entity];
                                eventsOutput='';
                                //console.log(events.length);
                                events.forEach(element => {
                                    //console.log('i am in event');
                                    // Visit non-inherited enumerable keys
                                    let event;
                                    Object.keys(element).forEach(function(event) {
                                        switch (event) {
                                            case 'eventAction':
                                                eventsOutput += '<br><b>' + element[event] + '<b>';
                                                break;
                                            case 'eventDate':
                                                eventsOutput += '<br>' + element[event];
                                                break;
                                            
                                            default:    
                                        }
                                    });
                                        
                                });

                                entityOutput += "<br>Event list"+ eventsOutput;  
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
                                                linksOutput += '<br><b>href: ' + element[link] + '<b>';
                                                break;
                                            case 'rel':
                                                linksOutput += '<br>rel: ' + element[link];
                                                break;
                                            case 'type':
                                                linksOutput += '<br>type: ' + element[link];
                                                break;
                                            case 'value':
                                                linksOutput += '<br>value: ' + element[link];
                                                break;        
                                            
                                            default:    
                                        }
                                    });
                                        
                                });

                                entityOutput += "<br>Link list<br>"+ linksOutput;  
                                break;    
                            case 'handle':
                                entityOutput += '<br><b>Handle:</b> ' + element[entity] + '<br>';
                                break;
                            case 'objectClassName':
                                entityOutput += '<br><b>Object Class Name:</b>' + element[entity] + '</b>';
                                break;
                            
                            default:    
                        }
                    });
                        
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
                      <!--   <tr>
                    //     <th scope="row">CIDR/ Route</th>
                    //     <td>1.22.0.0/15 [ Array ]</td>
                    //   </tr>
                    //   <tr>
                    //     <th scope="row">Organization</th>
                    //     <td>GOGL [static]</td>
                    //   </tr> -->
                      <tr>
                        <th scope="row">Netname</th>
                        <td>${name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Country</th>
                        <td>${country}</td>
                      </tr>
                      <tr>
                        <th scope="row">Type</th>
                        <td>${type}</td>
                      </tr>
                      <!--   <tr>
                    //     <th scope="row">Status</th>
                    //     <td>REALLOCATION - Array</td>
                    //   </tr>
                    //   <tr>
                    //     <th scope="row">Description</th>
                    //     <td>Google [static]</td>
                    //   </tr>
                    //   <tr>
                    //     <th scope="row">Origin</th>
                    //     <td>AS15169 [static]</td>
                    //   </tr> -->
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
}