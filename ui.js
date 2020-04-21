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
        let startAddress;
        let endAddress;
        let handle;
        let parentHandle;
        let name;
        let type;
        let port43;
        let version;
        let country;
        // iterate the value of the ip
        for (var key of Object.keys(res)) {
            if(key == 'handle'){
                handle = res[key]; 
            }else if(key == 'parentHandle'){
                parentHandle = res[key]; 
            }else if(key == 'name'){
                name = res[key]; 
            }else if(key == 'type'){
                type = res[key]; 
            }else if(key == 'startAddress'){
                startAddress = res[key]; 
            }else if(key == 'ipVersion'){
                version = res[key]; 
            }else if(key == 'endAddress'){
                endAddress = res[key]; 
            }else if(key == 'port43'){
                port43 = res[key]; 
            }else if(key == 'country'){
                country = res[key]; 
            }


            // ipInfo +="<tr><td>"+key + " </td><td>" + res[key] + "</td></tr>"; 
            //console.log(key + " -> " + p[key])
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