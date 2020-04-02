window.onload = function(){
    if (!document.getElementById) document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    document.getElementById("btnSubmit").onclick=function(){
        const ip = document.getElementById("txtIP").value;
        
        
        
        let request = new XMLHttpRequest();
        request.open('GET', 'https://rdap.db.ripe.net/ip/'+ip);
        request.responseType = 'text';

        request.onload = function() {
            const objData = JSON.parse(request.response);
            
            let ipInfo ='';
            ipInfo +="<table><tr><td>key</td><td>Value</td></tr>";
            for (var key of Object.keys(objData)) {
                ipInfo +="<tr><td>"+key + " </td><td>" + objData[key] + "</td></tr>"; 
                //console.log(key + " -> " + p[key])
            }
            ipInfo +="</table>";

            document.getElementById("showIP").innerHTML = ipInfo;
        };

        request.send();         
        // console.log(ip);
    }
}
