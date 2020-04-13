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
}