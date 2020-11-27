//console.log('background script is running!!');


// fetch the rdap information of a specific ip
async function getApiData(url){
   //console.log(url);
   const response = await fetch(url);
   const jsondata = await response.json();
   return jsondata;                    
}

// date difference
function getDateDifferance(firstDate, secondDate){ 
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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { 
   //alert(changeInfo.status); 
   if (changeInfo.status == 'complete') { 
     // console.log('Tab ID:' + tabId);
      
      $parseURL = new URL(tab.url);

      $mainURL = $parseURL.hostname;
     
      
      if($mainURL !== 'newtab'){      
         // remove the subdomain
         var parsed = psl.parse($mainURL);
         $rootURL = parsed.domain;
        // console.log(parsed.domain);
         getApiData('https://rdap.org/domain/'+$rootURL)
         .then(res =>{
            //console.log(res);
            
            // destructuring the res object
            let {events} = res;
            events.forEach(element => {
               // Destructure the single event
               let {eventAction,eventDate}=element;
               if(eventAction === "registration"){
                   // check the registration tenure
                   let now = new Date();
                   let regDate = new Date( Date.parse(eventDate) );
                   //let regAge=[];
                   let regAge = this.getDateDifferance(now, regDate);                   
                   if(regAge[0] > 1){                     
                        chrome.browserAction.setIcon({tabId: tab.id,path:"img/rdap-logo-green.png"});
                        chrome.browserAction.setBadgeBackgroundColor({tabId: tab.id,color: [0, 0, 0, 0] });
                        chrome.browserAction.setBadgeText({tabId: tab.id, text: ""+regAge[0]+"-Y"});    
                   }else{
                       // to change the icon
                       chrome.browserAction.setIcon({tabId: tab.id,path:"img/rdap-logo-red.png"});
                       chrome.browserAction.setBadgeBackgroundColor({tabId: tab.id, color: [255, 0, 0, 255] });
                       chrome.browserAction.setBadgeText({tabId: tab.id, text: "<1-Y"});    
                   }
                   //chrome.tabs.create({url:"practice.html"});
               }
            });
         })
      }
                   
      
   } 
});