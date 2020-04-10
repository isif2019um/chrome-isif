window.onload = function(){

    //if (!document.getElementById) document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    
    const submitButton = () => {
        //document.getElementById("btnSubmit").onclick=function(){
            // for scrolling
            // let _height = document.documentElement.clientHeight;
            // //let _height = document.body.clientHeight;
            // //console.log(_height);
            // document.querySelector('.container').style.height = _height+'px';
    
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
                        ipInfo +="<table class='table table-hover'><tbody><tr class='table-active'><td>key</td><td>Value</td></tr>";
                        for (var key of Object.keys(res)) {
                            ipInfo +="<tr><td>"+key + " </td><td>" + res[key] + "</td></tr>"; 
                            //console.log(key + " -> " + p[key])
                        }
                        ipInfo +="</tbody></table>";
    
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
                            ipInfo +="<table class='table table-hover'><tbody><tr class='table-active'><td>key</td><td>Value</td></tr>";
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
        }
    
    var input      = document.getElementById("txtIP");
    input.addEventListener("keyup", function(event){
        if (event.keyCode === 13) {
            event.preventDefault();
            //console.log('i am in enter');
            submitButton();
           
    }       
   });
   document.getElementById("btnSubmit").onclick=function(){
    submitButton();
   }
}