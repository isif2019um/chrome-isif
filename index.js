window.onload = function(){
    
    if (!document.getElementById) document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    
    document.getElementById("btnSubmit").onclick=function(){
        let ip = document.getElementById("txtIP").value;

        let _domain = document.getElementById("txtDomain").value;

        async function getIPofDomain(_domain){
            let response = await fetch('https://dns.google/resolve?name='+_domain);
            let json = await response.json();
            return json.Answer[0].data;
        }
        
        async function getApiData(url){
            console.log(url);
            //try{
                const response = await fetch(url);
            //}catch(e){
              //  console.log(e);
            //}
                const jsondata = response.json();
                return jsondata;
                    
        }

        if(!_domain==""){
            getIPofDomain(_domain)
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
                // console.log('IP:'+ip);
                // console.log('response: '+res);
            })
        } else if(!ip == ""){
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

        }
        
        //console.log('IP'+ip);        
        // async function getApi(url){
        //     const promise = new Promise((resolve,reject)=>{
        //     setTimeout(()=>{
        //         resolve('Hello');
        //     },5000)
        //     });
            
        //     const error = false;

        //     if(!error){
        //         const res = await promise;
        //         return res;
        //     } else{
        //         await Promise.reject(new Error('Something wrong'));
        //     }
        // };
        
        

        // ASYNC AWAIT METHOD

        


        
        
        // console.log("I am first."); 
        //console.log(getApi('http://isif-asia.org'));
        
        // SIMPLE GET FUNCTION
        
        // let request = new XMLHttpRequest();
        // request.open('GET', 'https://rdap.db.ripe.net/ip/'+ip);
        // request.responseType = 'text';

        // request.onload = function() {
        //     const objData = JSON.parse(request.response);
            
        //     let ipInfo ='';
        //     ipInfo +="<table><tr><td>key</td><td>Value</td></tr>";
        //     for (var key of Object.keys(objData)) {
        //         ipInfo +="<tr><td>"+key + " </td><td>" + objData[key] + "</td></tr>"; 
        //         //console.log(key + " -> " + p[key])
        //     }
        //     ipInfo +="</table>";

        //     document.getElementById("showIP").innerHTML = ipInfo;
        // };

        // request.send();         
        // console.log(ip);
    }
}