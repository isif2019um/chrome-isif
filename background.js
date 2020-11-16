console.log('background script is running!!');

chrome.tabs.getSelected(null,function(tab) {
   console.log('i am in tab selected', tab);
});