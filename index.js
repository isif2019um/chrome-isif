window.onload = function(){
    // initiatize the UI
    const ui = new UI; 
    
    // execute this function when click the search button
    const submitButton = (inputValue) => {
        // get the input value    
        // let ip      = document.getElementById("txtIP").value;
        // const loader = document.querySelector('#lds-hourglass');
        // const result = document.querySelector('result');

        let ip      = inputValue;
        console.log("i am in submit" + ip); 
        
        
        // check the validity of ipv4 
        const checkValidIP = ip =>{
            let blocks = ip.split(".");
            if(blocks.length === 4) {
                return blocks.every(function(block) {
                return parseInt(block,10) >=0 && parseInt(block,10) <= 255;
                });
            }
            return false;
        }

        // check the vality of IPv6
        const checkValidIPV6 = ip =>{
            var re = new RegExp(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/); 
            return ip.match(re);
        }

        // check the vality of ASN
        const checkValidASN = ip =>{
            let reASN = new RegExp(/^([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])(\.([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|0))?$/);  
            return ip.match(reASN);
        }

        
    
        // check the valid domain name
        const checkValidDomain = _domain =>{
            var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
            return _domain.match(re);
        }

        // fetch the ip address of a specific domain
        async function getIPofDomain(_domain){
            let response = await fetch('https://dns.google/resolve?name='+_domain);
            let json = await response.json();
            return json.Answer[0].data;
        }
        
        // fetch the rdap information of a specific ip
        async function getApiData(url){
            //console.log(url);
            const response = await fetch(url);
            const jsondata = await response.json();
            return jsondata;                    
        }

        // fetch the ASN by passing the IP address
        // async function getASN(ip){
        //     const response = await fetch(`https://ipapi.co/${ip}/json/`);
        //     const data = await response.json();
        //     return data.asn;    
        // }

        // fetch the network information by passing the ASN address
        async function getNetworkASN(asn){
            let res1 = asn.split(".");
            //console.log(res1);
            if(res1.length>1){
                asn = parseInt(res1[0]*65536)+parseInt(res1[1]);
            }else{
                asn = parseInt(res1[0]);
            }
            
           // document.getElementsByClassName('lds-hourglass').style.display='block';
            const response = await fetch(`https://api.bgpview.io/asn/${asn}`);
            const data = await response.json();
           // document.getElementsByClassName('lds-hourglass').style.display='none';
            return data.data;    
        }
        
        // fetch the nameserver of a domain
        async function getNameServer(_domain){
            const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/DNSService?apiKey=at_kIEcsLxf9NAlDXcPdTXOXudneUApQ&domainName=${_domain}&type=2&outputFormat=JSON`);                
            const data = await response.json();
            return data;    
        }
            
        if(!ip == "")
        {
            const ipValidityStatus = checkValidIP(ip);
            const ip6ValidityStatus = checkValidIPV6(ip);
            let asn ='';
            if(ipValidityStatus || ip6ValidityStatus){
                let response = checkCookie(ip,tetrievedSuggestedItems);
                
                if(response){
                    ui.displayResult(response);
                }else{
                getApiData('https://rdap.db.ripe.net/ip/'+ip)
                    .then(res => {
                        ui.displayResult(res);
                        addCookieObject(ip, res, tetrievedSuggestedItems);
                        })
                    .catch(err => {
                            // ui.displayResult(err);
                            document.getElementById("result").innerHTML = err;
                    })
               }
            }else if(checkValidDomain(ip)){
                
                // fetch the domain nameserver
                let nsrecords="";
                getNameServer(ip)
                    .then(res=>{
                        // this.console.log(res);
                        nsrecords = res.DNSData.dnsRecords; 
                       //console.log(nsrecords[0].additionalName);
                    });    
                
                // fetch the IP inforamtion by the domain IP
                getIPofDomain(ip)
                .then(res => {                    
                    getApiData('https://rdap.db.ripe.net/ip/'+res)
                    .then(res => {
                        ui.displayResult(res, nsrecords);
                        // console.log("NSRECORDS:" + nsrecords);
                        // let domainandnsrecord = {
                        //     "nsrecord": nsrecords,
                        //     "wrdprecord": res  
                        // }
                        // console.log("response:" + domainandnsrecord);
                        addCookieObject(ip, ip, tetrievedSuggestedItems);
                        })
                    .catch(err => {
                        ui.displayResult(res);
                        document.getElementById("result").innerHTML = err;
                    })                
                }) 
            }else if (checkValidASN(ip)){
                let response = checkCookie(ip,tetrievedSuggestedItems);
                
                if(response){
                    ui.displayASNResult(response);
                }else{
                    getNetworkASN(ip)
                    .then(res => {
                        ui.displayASNResult(res);
                        //console.log("ASN:" + res);
                        addCookieObject(ip, res, tetrievedSuggestedItems);
                        })
                    .catch(err => {
                            // ui.displayResult(err);
                            document.getElementById("result").innerHTML = err;
                    })
                }
                

            }else{
                document.getElementById("result").innerHTML = "::Invalid ASN/Domain/IPv4/IPv6/Name Sercer/:: <br>Pls write the following ways:- <br><br>ASN - 54540 or 1.23 <br>Domain - google.com<br>IPv4 - 1.23.42.12 <br>IPv6 - 2402:1980:249:43e3:bd55:7d09:414c:31c2<br>Name Server - ns1.google.com<br>" + ip;
            }
    
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        
        let retrievedData = getCookie("lsSuggestedItems");
        //console.log(retrievedData);
        if(retrievedData){
            var tetrievedSuggestedItems = JSON.parse(retrievedData);
            if(Object.keys(tetrievedSuggestedItems).length>2){
                // var obj = { 'bar' : 'baz' }
                var key = Object.keys(tetrievedSuggestedItems)[2];
                //var value = tetrievedSuggestedItems[key];
                delete tetrievedSuggestedItems[key];
                document.cookie = cname + "=" + JSON.stringify(tetrievedSuggestedItems) + ";" + expires + ";path=/";
            }
            console.log("length:"+Object.keys(tetrievedSuggestedItems).length);
        }

        //console.log("cvalue" + cvalue);
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        //console.log("document cookies:" + document.cookie);
    }

    function checkCookie(checkIP, stockList) {
        if (checkIP in stockList){
            return stockList[checkIP];
        }else{
            return false;
        }
    }

    // add value to Cookie
    function addCookieObject(key, value, tetrievedSuggestedItems){
        //let mySuggestedItems = [];
        //console.log("Add cookies" + key, value, tetrievedSuggestedItems);
        if(Object.getOwnPropertyNames(tetrievedSuggestedItems).length === 0){
            //is empty
            let tetrievedSuggestedItems = {};
            tetrievedSuggestedItems[key] = value;
            // console.log("Empty List", tetrievedSuggestedItems);
            //localStorage.setItem("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems));
            setCookie("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems),2);
            reloadDdl(tetrievedSuggestedItems);
        }else{
            //if(tetrievedSuggestedItems.hasOwnProperty(key)){
                tetrievedSuggestedItems[key] = value;
                // console.log("Append", tetrievedSuggestedItems);
                setCookie("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems), 2);
                reloadDdl(tetrievedSuggestedItems);      
           // }
        }
        
    }


    // add value to Cookie
    function addCookie(value, tetrievedSuggestedItems){
        //let mySuggestedItems = [];
        if(tetrievedSuggestedItems){
            if(!tetrievedSuggestedItems.includes(value)){
                tetrievedSuggestedItems.unshift(value);
                setCookie("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems),2);
                reloadDdl(tetrievedSuggestedItems);      
            }
        }else{
            let tetrievedSuggestedItems = [];
            tetrievedSuggestedItems.unshift(value);
            //console.log("Empty List", tetrievedSuggestedItems);
            //localStorage.setItem("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems));
            setCookie("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems),2);
            reloadDdl(tetrievedSuggestedItems); 
        }
        
    }

    // add value to localstorage
    function addLocalStorage(value, tetrievedSuggestedItems){
        //let mySuggestedItems = [];
        if(tetrievedSuggestedItems){
            if(!tetrievedSuggestedItems.includes(value)){
                tetrievedSuggestedItems.unshift(value);
                //console.log("local list", tetrievedSuggestedItems);
                //localStorage.setItem("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems));
                sessionStorage.setItem("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems));
                reloadDdl(tetrievedSuggestedItems);      
            }
        }else{
            let tetrievedSuggestedItems = [];
            tetrievedSuggestedItems.unshift(value);
            console.log("Empty List", tetrievedSuggestedItems);
            //localStorage.setItem("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems));
            sessionStorage.setItem("lsSuggestedItems", JSON.stringify(tetrievedSuggestedItems));
            reloadDdl(tetrievedSuggestedItems); 
        }
        
    }

    // reload the dropdownlist of search items
    function reloadDdl(tetrievedSuggestedItems){

        let list = document.getElementById('suggestionList');
        list.innerHTML = "";
        //console.log('local storage', tetrievedSuggestedItems);
        if(tetrievedSuggestedItems){
            var tetrievedSuggestedItemsArray = Object.keys(tetrievedSuggestedItems);
            tetrievedSuggestedItemsArray.forEach(function(item){
                let option = document.createElement('option');
                option.value = item;
                list.appendChild(option);
            });
        }
    }
    
    var input      = document.getElementById("txtIP");
    
    // for auto suggestion
  
    // localStorage.removeItem("lsSuggestedItems");
    
    // for localstorage / sessionstorage
    //var retrievedData = localStorage.getItem("lsSuggestedItems");
    // var retrievedData = sessionStorage.getItem("lsSuggestedItems");
    //var tetrievedSuggestedItems = JSON.parse(retrievedData);

    //for cookies

    // for reset cookies values
    // setCookie("lsSuggestedItems","",1);
    //var inputArray = ['bengalfoundation.org'];
    //setCookie("lsSuggestedItems",JSON.stringify(inputArray), 2);
    var retrievedData = getCookie("lsSuggestedItems");
    //console.log(retrievedData);
    if(retrievedData){
        var tetrievedSuggestedItems = JSON.parse(retrievedData);
    }else{
        var tetrievedSuggestedItems = {};
    }

    

    //console.log("from cookie:",retrievedData);

    // end cookies

    let list = document.getElementById('suggestionList');
    
    //console.log('local storage', tetrievedSuggestedItems);
    if(tetrievedSuggestedItems){
        var tetrievedSuggestedItemsArray = Object.keys(tetrievedSuggestedItems);
        tetrievedSuggestedItemsArray.forEach(function(item){
            let option = document.createElement('option');
            option.value = item;
            list.appendChild(option);
        });
    }
    
    // close for auto suggestion 
    
    
    //let inputValue = document.getElementById("txtIP").value;
    input.addEventListener("keyup", function(event){
        let inputValue = input.value;
    
        var reNS = new RegExp(/^([a-zA-Z0-9]+|[a-zA-Z0-9]*\*[a-zA-Z0-9]*)(\.[a-zA-Z0-9]+){2,3}$/);
        var reIPv4 = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
        var reDomain = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
        let reASN = new RegExp(/^([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])(\.([1-5]\d{4}|[1-9]\d{0,3}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|0))?$/); 
        let reIPv6 = new RegExp(/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/);
        
        if(inputValue.match(reIPv4)){
            document.getElementById("ddOption").options[3].selected = true;
        }else if(inputValue.match(reIPv6)){
            document.getElementById("ddOption").options[4].selected = true;
        }else if(inputValue.match(reNS)){
            document.getElementById("ddOption").options[2].selected = false; 
            document.getElementById("ddOption").options[5].selected = true;
        }else if (inputValue.match(reDomain)){
            document.getElementById("ddOption").options[2].selected = true;

        }else if (inputValue.match(reASN)){
            document.getElementById("ddOption").options[1].selected = true;
        }else{
            document.getElementById("ddOption").options[0].selected = true;
        }


        if (event.keyCode === 13) {
            event.preventDefault();
            
            //  add value to localstorage
            let inputValue = input.value;
            //addLocalStorage(inputValue, tetrievedSuggestedItems);
            
            // for add cookie
            //addCookie(inputValue, tetrievedSuggestedItems);
            
            submitButton(inputValue);           
        }       
    });

    // paste the text from the clipboard
    input.onpaste = function(event) {
        let inputValue = event.clipboardData.getData('text/plain');
       // document.getElementById("txtIP").value = "";
       // document.getElementById("txtIP").value = inputValue;
       // if(inputValue){
       //     document.getElementById("txtIP").value = '';
       //     document.getElementById("txtIP").value = inputValue; 
       // } 
       // console.log("i am in onpaste" + inputValue);
       submitButton(inputValue);
   };
   // if(document.execCommand("paste")){
   //    console.log("You paste something");
   // }
   
    document.getElementById("btnSubmit").onclick=function(){
        let inputValue = input.value;
        // add value to localstorage
        // addLocalStorage(inputValue, tetrievedSuggestedItems);

        // for add cookie
        // addCookie(inputValue, tetrievedSuggestedItems);

        submitButton(inputValue);
    }    
}