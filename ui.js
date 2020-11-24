class UI{
    constructor(){
        const showIP = document.getElementById('showIP');
        let entityArray=[];
        let eventsOutput='';
        let entryOutput='';
        let entityOutput='';
        //let getEntityList='';
        let singleEntityValue='';
        //let diffDate=[];
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

    // date difference
    getDateDifferance(firstDate, secondDate){ 
      let difference = firstDate - secondDate;
      //let reglengthInYear = (difference * 0.00000000038) / 12;
      let totalDiffInDay = difference / (1000 * 3600 * 24);
      let diffYear = Math.floor(totalDiffInDay/365);
      let diffRestDays = Math.floor(totalDiffInDay%365);
      let diffMonths = Math.floor(diffRestDays/30);
      let diffDays = diffRestDays%30;
      let diffDate=[diffYear,diffMonths,diffDays];
      //console.log(diffDate);
      return diffDate;
    }

    displayResult(res,dType){
       
       console.log("dType",dType);
       console.log(res);
       
       let dnsOutput='';
       let ldhNameOutput='';
       let countryOutput='';
       let arinASNOutput='';
       let parentOutput ='';
       let statusOutput ='';
       let ipVersionOutput='';
       let blocksOutput='';
       let regAgeOutput='';
       
        // ajv validator. rules for the domains status 
        var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
        var schemaforIPv4IPv6ASNDomain = {
            "anyOf": [
                {
                    "type": "string",
                    "pattern": "^((?:(?:(?:\\w[\\.\\-\\+]?)*)\\w)+)((?:(?:(?:\\w[\\.\\-\\+]?){0,62})\\w)+)\\.(\\w{2,6})$",
                    "errorMessage": 'should be domain' 
                },
                {
                    "type": "string",
                    "pattern": "^([1-5]\\d{4}|[1-9]\\d{0,3}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5])(\\.([1-5]\\d{4}|[1-9]\\d{0,3}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5]|0))?$",
                    "errorMessage": 'should be sub domain'
                },
                {
                    "type": "string",
                    "format": "ipv6"
                },
                {
                    "type": "string",
                    "format": "ipv4"
                }
            ]
        };
        var schemaForRegCheck ={
          "type": "number",
          "minimum": 10,
          "errorMessage": 'this is a custom error messages'
        }
        // close ajv validator and rules or policy

      
      // destructuring the res object
      let {arin_originas0_originautnums,country,cidr0_cidrs,endAddress,entities,events,remarks,handle,ipVersion,links,name,objectClassName,notices,nameservers,ldhName,parentHandle,port43,rdapConformance,startAddress,status,type} = res;
      //  let {entities,events,handle,links,notices,objectClassName,ldhName,nameservers,status} = res;
      

             
      // if(typeof dType === 'object' && dType !== null){
      //   country = dType.country;
      //   nameservers = dType.nameservers;
      //   ldhName = dType.ldhName;
      //   events=dType.events;
      //   //console.log('i am in object',country,events,nameservers,ldhName);
      // }
      
      //console.log('i am out object',country,events,nameservers,ldhName);
        // for objectClassName
        // if(objectClassName == undefined){
        //   objectClassName='Not available';
        // }

        // for ldhName
        // if(ldhName == undefined){
        //   ldhName='Not available';
        // }

        // for ldh Name information
        if(ldhName!='' && ldhName!= undefined){  
          ldhNameOutput='<dt class="col-sm-3 bg-dark text-white">Domain Name</dt><dd class="col-sm-9 bg-secondary">';
          ldhNameOutput += `${ldhName}`;
          ldhNameOutput +='</dd>';
        } 

      
        // // for objectClassName
        // if(objectClassName == undefined){
        //   objectClassName='Not available';
        // }

        // for dns information of a domain
        if(nameservers!='' && nameservers!=undefined){
             
          dnsOutput='<dt class="col-sm-3 bg-dark text-white">Nameservers</dt><dd class="col-sm-9 bg-secondary">';
          nameservers.forEach(element => {
            
            // destructure the nsrecords

            let {ldhName} = element;
                dnsOutput += `${ldhName}<br>`;
               // console.log(rawText);
          });

          dnsOutput +='</dd>';
        } 

        let ip = document.getElementById('txtIP').value;
            

        let noticeOutput,eventsOutput,linksOutput,entityOutput,mainEventsOutput,mainLinksOutput,statusesOutput,remarkOutput;
        noticeOutput=eventsOutput=linksOutput=entityOutput=mainEventsOutput=mainLinksOutput=statusesOutput=remarkOutput='Not available';

        
        // for IP Version
        if(ipVersion!='' && ipVersion!= undefined){  
          ipVersionOutput='<dt class="col-sm-3 bg-dark text-white">IP Version</dt><dd class="col-sm-9 bg-secondary">';
          ipVersionOutput += `${ipVersion}`;
          ipVersionOutput +='</dd>';
        } 
        
        // for ASN number
        if(arin_originas0_originautnums != undefined && arin_originas0_originautnums.length>0){
          arinASNOutput +='<dt class="col-sm-3 bg-dark text-white">ASN</dt><dd class="col-sm-9 bg-secondary">';
          arin_originas0_originautnums.forEach(element => {
            arinASNOutput +=element+"<br>";     
          });
          arinASNOutput+='</dd>';
        }
        
        // for Country information
        if(country!='' && country!= undefined){  
          countryOutput='<dt class="col-sm-3 bg-dark text-white">Country</dt><dd class="col-sm-9 bg-secondary">';
          countryOutput += `${country}`;
          countryOutput +='</dd>';
        } 

        // for parent Handle
        if(parentHandle!='' && parentHandle!= undefined){  
          parentOutput='<dt class="col-sm-3" bg-dark text-white>Parent</dt><dd class="col-sm-9 bg-secondary">';
          parentOutput += `${parentHandle}`;
          parentOutput +='</dd>';
        }
        
        // for Statuses
        // if(status != undefined){
        //   statusesOutput='';
        //   status.forEach(element => {
        //     statusesOutput += element + '<br>';
        //   });
        // }

        if(status != undefined && status.length>0){
          statusOutput +='<dt class="col-sm-3 bg-dark text-white">Status</dt><dd class="col-sm-9 bg-secondary">';
          status.forEach(element => {
            statusOutput +=element+"<br>";     
          });
          statusOutput+='</dd>';
        }



        // for block information
      //  if(cidr0_cidrs != undefined){
      //     blocksOutput='';
      //     cidr0_cidrs.forEach(element => {
      //       blocksOutput += element.v4prefix + '/' + element.length;
      //     });
      //  }

       if(cidr0_cidrs != undefined && cidr0_cidrs.length>0){
        blocksOutput +='<dt class="col-sm-3 bg-dark text-white">IP Block Information</dt><dd class="col-sm-9 bg-secondary">';
        cidr0_cidrs.forEach(element => {
          blocksOutput +=element.v4prefix + '/' + element.length;     
        });
        blocksOutput+='</dd>';
      }
        
       // for main event list
       if(events != undefined){
        mainEventsOutput =''; 
          events.forEach(element => {
                // Destructure the single event
                let {eventAction,eventDate}=element;
                if(eventAction === "registration"){
                    // check the registration tenure
                    let now = new Date();
                    let regDate = new Date( Date.parse(eventDate) );
                    //let regAge=[];
                    let regAge = this.getDateDifferance(now, regDate);
                    
                    //console.log(regAge); 

                    //let difference = now - regDate ;
                    //let reglengthInYear = (difference * 0.00000000038) / 12;
                    //let regAgeInDay = difference / (1000 * 3600 * 24);
                    
                    if(regAge[0]>1){

                    }
                    

                    //console.log(regAge[0]+'YEARS',regAge[1]+'MONTHS', regAge[2]+'DAYS',reglengthInYear);

                    if(regAge[0] > 1){
                      chrome.tabs.getSelected(null,function(tab) {
                            // to change the icon
                            chrome.browserAction.setIcon({tabId: tab.id,path:"img/rdap-logo-green.png"});    
                        })
                      regAgeOutput=`<dt class="col-sm-3 bg-success"> ${dType} Age: </dt><dd class="col-sm-9 bg-success">`;
                      regAgeOutput += `${regAge[0]} years ${regAge[1]} months and ${regAge[2]} days`;
                      regAgeOutput +='</dd>';    
                    }else{
                      chrome.tabs.getSelected(null,function(tab) {
                        // to change the icon
                            chrome.browserAction.setIcon({tabId: tab.id,path:"img/rdap-logo-red.png"});    
                        })
                      regAgeOutput=`<dt class="col-sm-3 bg-danger"> ${dType} Age: </dt><dd class="col-sm-9 bg-danger">`;
                      regAgeOutput += `${regAge[0]} years ${regAge[1]} months and ${regAge[2]} days`;
                      regAgeOutput +='</dd>';
                    }
                }

                
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
                                    
                    if(eventAction === "registration"){
                      let now = new Date();
                      let date = new Date( Date.parse(eventDate) );
                      let difference = now - date ;
                      let year = (difference * 0.00000000038) / 12;
                      //console.log(year);
                      //console.log(eventDate);
                      
                      // ajv validation
                      var validate = ajv.compile(schemaForRegCheck);
                      var checkData = year;
                      var valid = validate(checkData);
                      if (!valid) console.log(validate.errors);
                      // ajv validation close
                        // eventDate += " Date -"  + eventDate - today;
                    }
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
        // <h3>Search Result</h3>
        // <div class="card bg-info text-white mt-2 mb-3">
        //     <div class="card-header">IP: ${ip} [${ipVersion}]</div>
        // </div>

    let output = `
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">  
            <dl class="row">
            ${regAgeOutput}
            ${ldhNameOutput}
            ${ipVersionOutput}
            ${dnsOutput}
            <dt class="col-sm-3 bg-dark text-white">Important Dates</dt>
            <dd class="col-sm-9 bg-secondary">${mainEventsOutput}</dd>
            ${arinASNOutput}
            ${statusOutput}
            <dt class="col-sm-3 bg-dark text-white">Notices</dt>
            <dd class="col-sm-9 bg-secondary">${noticeOutput}</dd>
            <dt class="col-sm-3 bg-dark text-white">Links</dt>
            <dd class="col-sm-9 bg-secondary ">${mainLinksOutput}</dd>
            <dt class="col-sm-3 bg-dark text-white">Remarks</dt>
            <dd class="col-sm-9 bg-secondary">${remarkOutput}</dd>
            <dt class="col-sm-3 bg-dark text-white">Netname</dt>
            <dd class="col-sm-9 bg-secondary">${name}</dd>
            <dt class="col-sm-3 bg-dark text-white">Net Range</dt>
            <dd class="col-sm-9 bg-secondary">${startAddress} - ${endAddress}</dd>
            ${countryOutput}
            <dt class="col-sm-3 bg-dark text-white">Type</dt>
            <dd class="col-sm-9 bg-secondary">${type}</dd>
            ${blocksOutput}
            <dt class="col-sm-3 bg-dark text-white">Handle</dt>
            <dd class="col-sm-9 bg-secondary">${handle}</dd>
            ${parentOutput}
            <dt class="col-sm-3 bg-dark text-white">Port 43 Whois</dt>
            <dd class="col-sm-9 bg-secondary">${port43}</dd>
            <dt class="col-sm-3 bg-dark text-white">Entities</dt>
            <dd class="col-sm-9 bg-light"><div id="jsonResult"></div></dd>
          </dl>
                      
        </div>
         `;

        document.getElementById('result').innerHTML=output;
        
        // for jsonformatter
       // console.log(entities);
       // console.log(typeof(entities));
        const formatter = new JSONFormatter(entities);
        // document.body.appendChild(formatter.render());
        document.getElementById('jsonResult').appendChild(formatter.render()); 
        //var displayJsonEntities = formatter.render();
        formatter.openAtDepth(10);

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
        
        
        // validation
        let now = new Date();
        let testValue="this is test one. you can omit it";
        let date = new Date( Date.parse(date_allocated) );
        let difference = now - date ;
        let year = (difference * 0.00000000038) / 12;
        console.log(year);
         
         


        //  <h3>Search Result</h3>
        // <div class="card bg-info text-white mt-2 mb-3">
        //     <div class="card-header">ASN: ${asn}</div>
        // </div>
        let output =
        `       
        <div class="card bg-light mt-2 mb-3">
            <div class="card-header">Network Informations</div>
            <div class="card-body">
                             
              <dl class="row">
                <dt class="col-sm-3">Name</dt>
                <dd class="col-sm-9">${name}</dd>

                <dt class="col-sm-3">Short Description</dt>
                <dd class="col-sm-9">
                     ${description_short}
                </dd>

                <dt class="col-sm-3">Full Description</dt>
                <dd class="col-sm-9">${description_fullDisplay}</dd>

                <dt class="col-sm-3 text-truncate">Country Code</dt>
                <dd class="col-sm-9">${country_code}</dd>

                <dt class="col-sm-3">Website</dt>
                <dd class="col-sm-9">${website}</dd>

                <dt class="col-sm-3">Email Contact</dt>
                <dd class="col-sm-9">${email_contactsDisplay}</dd>
                <dt class="col-sm-3">Abuse Contacts</dt>
                <dd class="col-sm-9">${abuse_contactsDisplay}</dd>
                <dt class="col-sm-3">Looking Glass</dt>
                <dd class="col-sm-9">${looking_glass}</dd>
                <dt class="col-sm-3">Traffic Estimation</dt>
                <dd class="col-sm-9">${traffic_estimation}</dd>
                <dt class="col-sm-3">Traffic Ratio</dt>
                <dd class="col-sm-9">${traffic_ratio}</dd>
                <dt class="col-sm-3">Owner Address</dt>
                <dd class="col-sm-9">${owner_addressDisplay}</dd>
                <dt class="col-sm-3">Updated Date</dt>
                <dd class="col-sm-9">${date_updated}</dd>
                <dt class="col-sm-3">IANA Assignment</dt>
                <dd class="col-sm-9">
                   <dl class="row">
                      <dt class="col-sm-4">Status</dt>
                      <dd class="col-sm-8">${assignment_status}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Assign Date</dt>
                      <dd class="col-sm-8">${date_assigned}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Description</dt>
                      <dd class="col-sm-8">${description}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Whois Server</dt>
                      <dd class="col-sm-8">${whois_server}</dd>
                   </dl>  
                </dd>
                <dt class="col-sm-3">RIR allocation</dt>
                <dd class="col-sm-9">
                   <dl class="row">
                      <dt class="col-sm-4">Status</dt>
                      <dd class="col-sm-8">${allocation_status}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Country</dt>
                      <dd class="col-sm-8">${rir_country}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">Allocation Date</dt>
                      <dd class="col-sm-8">${date_allocated}</dd>
                   </dl>
                   <dl class="row">
                      <dt class="col-sm-4">RIR Name</dt>
                      <dd class="col-sm-8">${rir_name}</dd>
                   </dl>  
                </dd>
              </dl>
           </div>
        </div> 
        `;
        document.getElementById('result').innerHTML=output;
    }
}