chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
      'outerBounds': {
        'width': 780,
        'height': 700
      }
    });
  });