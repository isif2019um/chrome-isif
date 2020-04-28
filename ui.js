class UI{
    constructor(){
        const showIP = document.getElementById('showIP');
        let entityArray=[];
        let eventsOutput='';
        let entryOutput='';
        let entityOutput='';
        //let getEntityList='';
        let singleEntityValue='';
    }
    
    displayASN(message){

        const div = document.createElement('div');
        div.className = 'col-5';
        const container = document.querySelector('.displayIP');
        const beforeThis = document.querySelector('#shopIP');
        container.appendChild(document.createTextNode(message));
        container.insertBefore(div.beforeThis);
        
    }

    // for Entries List recursive
     
    getEntityList(entities){
       console.log(entities);
       //this.singleEntityValue +="i am";
       this.entityArray=[];
       entities.forEach(element => {
         
         let {events: eEvents,handle,links: eLinks,objectClassName,port43,roles,vcardArray,entities: r_entities}=element;
        //  // for event list
        //   if(eEvents != undefined){
        //     this.eventsOutput =''; 
        //     eEvents.forEach(event => {
        //             // Destructure the single event
        //             let {eventAction,eventDate}=event;
        //             this.eventsOutput += '<b>' + eventAction + '</b><br>'+ eventDate + '<br><br>';
        //       });
        //   }

          // for port43
          if(port43 == undefined){
            port43 ='Port43 not available';   
          }

          // for handle
          if(handle == undefined){
            handle ='Handle isnot available';   
          }

          //    // for link list
          // if(eLinks != undefined){
          //   let linksOutput =''; 
          //   eLinks.forEach(link => {
          //           // Destructure the single link
          //         let {href:ehref,rel: erel,type: etype,value: evalue}=link;
          //         linksOutput += `<b>href: </b>${ehref}<br><b>rel: </b>${erel}<br><b>type: </b> ${etype}<br><b>value: </b>${evalue}<br><br>`;
          //     });
          //  }

            this.singleEntityValue += `<b>${handle}</b><br>${port43}<br><br><b>::Event List::</b><br><br><b>::Link List::</b><br><hr>`;
          if(r_entities != 'undefined' && r_entities != null){
              //console.log(r_entities+'i am un');
              this.getEntityList(r_entities);
          }
          //this.entityArray.push(singleEntityValue);
          this.entityArray.push(this.singleEntityValue);
       });
      //  console.log(this.entityArray);
      //return this.entityArray;
      return this.singleEntityValue; 
    }

    displayResult(res,nsrecords=''){
        console.log(res);
       let dnsOutput='';
        
       // for dns information of a domain
        if(nsrecords!=''){
          dnsOutput='<tr><th scope="row">DNS Records</th><td>';
          nsrecords.forEach(element => {
            
            // destructure the nsrecords

            let {additionalName,dnsType,name,rRsetType,rawText,target,ttl,type} = element;
                dnsOutput += `${rawText}<br>`;
               // console.log(rawText);
          });

          dnsOutput +='</td></tr>';
        } 

        // destructuring the res object
        let {arin_originas0_originautnums,country,cidr0_cidrs,endAddress,entities,events,remarks,handle,ipVersion,links,name,notices,objectClassName,parentHandle,port43,rdapConformance,startAddress,status,type} = res;
        
        let ip = document.getElementById('txtIP').value;
            

        let noticeOutput,eventsOutput,linksOutput,entityOutput,mainEventsOutput,mainLinksOutput,arinASNOutput,blocksOutput,statusesOutput,remarkOutput;
        noticeOutput=eventsOutput=linksOutput=entityOutput=mainEventsOutput=mainLinksOutput=arinASNOutput=blocksOutput=statusesOutput=remarkOutput='Not available';

        // for ASN number
        if(arin_originas0_originautnums != undefined){
          arinASNOutput='';
          arin_originas0_originautnums.forEach(element => {
            arinASNOutput +=element+"<br>";     
          });
        }
        
        // for country
        if(country == undefined){
          country='Not available';
        }

        // for parent Handle
        if(parentHandle == undefined){
          parentHandle='Not available';
        }
        
        // for Statuses
        if(status != undefined){
          statusesOutput='';
          status.forEach(element => {
            statusesOutput += element + '<br>';
          });
        }

        // for block information
       if(cidr0_cidrs != undefined){
          blocksOutput='';
          cidr0_cidrs.forEach(element => {
            blocksOutput += element.v4prefix + '/' + element.length;
          });
       }
        
       // for main event list
       if(events != undefined){
        mainEventsOutput =''; 
          events.forEach(element => {
                // Destructure the single event
                let {eventAction,eventDate}=element;
                mainEventsOutput += '<b>' + eventAction + '</b><br>'+ eventDate + '<br>';
          });
        }


       // for main link list
       if(links != undefined){
          mainLinksOutput='';  
          links.forEach(element => {
            // Destructure the single link
            let {href,rel,type,value}=element;
            
            // get the domain IP
            let valArray = value.split('/');
            ip = valArray[valArray.length-1];
            
            mainLinksOutput += `<b>href: </b>${href}<br><b>rel: </b>${rel}<br><b>type: </b> ${type}<br><b>value: </b>${value}<br><br>`;
          });
        }

      // for notice list
      if(notices != undefined){
        noticeOutput=''; 
        notices.forEach(element => {
          // Destructure the single notice
          let {title,description}=element;
          noticeOutput += `<b>${title}</b><br>${description}<br><br>`;
        });
      }

      // for remarks list
      if(remarks != undefined){
        remarkOutput=''; 
        remarks.forEach(element => {
          // Destructure the single remark
          let {title,description}=element;
          remarkOutput += `<b>${title}</b><br>${description}<br><br>`;
        });
      }

      // for entities list
      if(entities != undefined){
        entityOutput='';
        //entityOutput = this.getEntityList(entities); 
        let entityNumber=0;
        entities.forEach(element => {
          entityNumber++;
          entityOutput +="<b>Entity Number: "+entityNumber+"</b><br><br>";
          // Destructure the single entity
          let {events: eEvents,handle,links: eLinks,objectClassName,port43,roles,vcardArray}=element;
          
          // for event list
          if(eEvents != undefined){
            eventsOutput =''; 
            eEvents.forEach(event => {
                    // Destructure the single event
                    let {eventAction,eventDate}=event;
                    eventsOutput += '<b>' + eventAction + '</b><br>'+ eventDate + '<br><br>';
              });
          }

          // for event list
          if(port43 == undefined){
            port43 ='Port43 not available';   
          }

            // for link list
          if(eLinks != undefined){
            linksOutput =''; 
            eLinks.forEach(link => {
                    // Destructure the single link
                  let {href:ehref,rel: erel,type: etype,value: evalue}=link;
                  linksOutput += `<b>href: </b>${ehref}<br><b>rel: </b>${erel}<br><b>type: </b> ${etype}<br><b>value: </b>${evalue}<br><br>`;
              });
            }

          entityOutput += `<b>${handle}</b><br>${port43}<br><br><b>::Event List::</b><br>${eventsOutput}<br><b>::Link List::</b><br>${linksOutput}<hr>`;
        });
      }


    let output = `
        <h3>Search Result</h3>
        <div class="card bg-info text-white mt-2 mb-3">
            <div class="card-header">IP: ${ip} [${ipVersion}]</div>
        </div>
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">
              <p class="card-text">
                <div class="table-responsive">  
                <table class="table table-hover">
                    <tbody>
                      ${dnsOutput}
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
         `;

        document.getElementById('result').innerHTML=output;
    }

    displayASNResult(res){
        //console.log(res);
        
        // destructuring the res object
        let {abuse_contacts,asn,country_code,date_updated,description_full,description_short,email_contacts,iana_assignment,looking_glass,name,owner_address,rir_allocation
        ,traffic_estimation,traffic_ratio,website} = res;
        
        // destructuring the iana assignment object
        let {assignment_status,date_assigned,description,whois_server}= iana_assignment;
        
        // destructuring the rir allocation object
        let {allocation_status,country_code: rir_country,date_allocated,rir_name}=rir_allocation;
        
        let description_fullDisplay="";
        description_full.forEach(element => {
          description_fullDisplay +=element+"<br>";                  
        });
        
        let email_contactsDisplay="";
        email_contacts.forEach(element => {
          email_contactsDisplay +=element+"<br>";
                  
        });
        let abuse_contactsDisplay="";
        abuse_contacts.forEach(element => {
          abuse_contactsDisplay +=element+"<br>";          
        });
        
        let owner_addressDisplay="";
        owner_address.forEach(element => {
          owner_addressDisplay +=element+"<br>";                  
        });
        
        let output =
        `        <h3>Search Result</h3>
        <div class="card bg-info text-white mt-2 mb-3">
            <div class="card-header">ASN: ${asn}</div>
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
                        <th scope="row">Full Description</th>
                        <td>${description_fullDisplay}</td>
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
                        <th scope="row">Email Contacts</th>
                        <td>${email_contactsDisplay}</td>
                      </tr>
                      <tr>
                        <th scope="row">Abuse Contacts</th>
                        <td>${abuse_contactsDisplay}</td>
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
                        <th scope="row">Owner Address</th>
                        <td>${owner_addressDisplay}</td>
                      </tr>
                      
                      <tr>
                        <th scope="row">Updated Date</th>
                        <td>${date_updated}</td>
                      </tr>
                      <tr>
                        <th scope="row">IANA Assignment</th>
                        <td><b>Status</b> : ${assignment_status}<br><b>Assign Date</b> : ${date_assigned}<br><b>Description</b> : ${description}<br><b>Whois Server</b> : ${whois_server}</td>
                      </tr>
                      <tr>
                        <th scope="row">RIR allocation</th>
                        <td><b>Status</b> : ${allocation_status}<br><b>Country</b> : ${rir_country}<br><b>Allocation Date</b> : ${date_allocated}<br><b>RIR Name</b> : ${rir_name}</td>
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