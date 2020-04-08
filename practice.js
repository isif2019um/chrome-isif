function getNumber(num){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{ 
          //resolve(num*20);
          reject('I am in error');
        },2000)
    });
}

function getSecondNumber(number1){
     return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('i am in second');
            resolve(20);
        },2000)
        
     })
}

getNumber(1)
   .then(num=>{
       console.log(num);
       return getSecondNumber(num);       
    })
    .then(num1=>{
        console.log(num1);
   })
   
   .catch(err=>{
       console.log(new Error(err));
   });


// Callback asyncronize method
// const getTimeOutCallback = (num)=>{
//     console.log(num*num);
// };

// const getNumber = (num,callback) => {
//     //setTimeout(function(){
//         console.log(num-2);
//         callback(num);    
//     //},5000);
// };


// console.log(1);

// getNumber(5,getTimeOutCallback);

// console.log('I am ready');