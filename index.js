window.onload = function(){
    
    //if (!document.getElementById) document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    
    document.getElementById("btnSubmit").onclick=function(){
        let ip      = document.getElementById("txtIP").value;
        // let _domain = document.getElementById("txtDomain").value;
        
        const checkValidIP = ip =>{
            let blocks = ip.split(".");
            if(blocks.length === 4) {
                return blocks.every(function(block) {
                return parseInt(block,10) >=0 && parseInt(block,10) <= 255;
                });
            }
            return false;
        }

        const checkValidDomain = _domain =>{
            var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
            return _domain.match(re);
        }


        async function getIPofDomain(_domain){
            let response = await fetch('https://dns.google/resolve?name='+_domain);
            let json = await response.json();
            return json.Answer[0].data;
        }
        
        async function getApiData(url){
            console.log(url);
            const response = await fetch(url);
            const jsondata = response.json();
            return jsondata;                    
        }

        
        if(!ip == ""){
            const ipValidityStatus = checkValidIP(ip);
            if(ipValidityStatus){
                getApiData('https://rdap.db.ripe.net/ip/'+ip)
                .then(res => {      
                    let ipInfo ='';
                    ipInfo +="<table><tr><td>key</td><td>Value</td></tr>";
                    for (var key of Object.keys(res)) {
                        ipInfo +="<tr><td>"+key + " </td><td>" + res[key] + "</td></tr>"; 
                        //console.log(key + " -> " + p[key])
                    }
                    ipInfo +="</table>";

                    document.getElementById("showIP").innerHTML = ipInfo;
                    })
                .catch(err => {
                    document.getElementById("showIP").innerHTML = err;
                })
            }else if(checkValidDomain(ip)){
                getIPofDomain(ip)
                .then(res => {                
                    getApiData('https://rdap.db.ripe.net/ip/'+res)
                    .then(res => {      
                        let ipInfo ='';
                        ipInfo +="<table><tr><td>key</td><td>Value</td></tr>";
                        for (var key of Object.keys(res)) {
                            ipInfo +="<tr><td>"+key + " </td><td>" + res[key] + "</td></tr>"; 
                            //console.log(key + " -> " + p[key])
                        }
                        ipInfo +="</table>";
    
                        document.getElementById("showIP").innerHTML = ipInfo;
                        })
                    .catch(err => {
                        document.getElementById("showIP").innerHTML = err;
                    })                
                }) 
            }else{
                document.getElementById("showIP").innerHTML = "Invalid IP / Domain"+ip;
            }

        }
        
        

        // if(!_domain == "")
        // {
            
        //     const domainValidityStatus = checkValidDomain(_domain);
        //     console.log(domainValidityStatus);
        //     if(domainValidityStatus){
        //         console.log('Valid Domain:'+_domain);
        //     }else{
        //         console.log("Invalid Domain:"+_domain);
        //     }


        //     getIPofDomain(_domain)
        //     .then(res => {                
        //         getApiData('https://rdap.db.ripe.net/ip/'+res)
        //         .then(res => {      
        //             let ipInfo ='';
        //             ipInfo +="<table><tr><td>key</td><td>Value</td></tr>";
        //             for (var key of Object.keys(res)) {
        //                 ipInfo +="<tr><td>"+key + " </td><td>" + res[key] + "</td></tr>"; 
        //                 //console.log(key + " -> " + p[key])
        //             }
        //             ipInfo +="</table>";

        //             document.getElementById("showIP").innerHTML = ipInfo;
        //             })
        //         .catch(err => {
        //             document.getElementById("showIP").innerHTML = err;
        //         })                
        //     })
        // } else if(!ip == ""){
        //       getApiData('https://rdap.db.ripe.net/ip/'+ip)
        //         .then(res => {      
        //             let ipInfo ='';
        //             ipInfo +="<table><tr><td>key</td><td>Value</td></tr>";
        //             for (var key of Object.keys(res)) {
        //                 ipInfo +="<tr><td>"+key + " </td><td>" + res[key] + "</td></tr>"; 
        //                 //console.log(key + " -> " + p[key])
        //             }
        //             ipInfo +="</table>";

        //             document.getElementById("showIP").innerHTML = ipInfo;
        //             })
        //         .catch(err => {
        //             document.getElementById("showIP").innerHTML = err;
        //         })
        // }
    }
}