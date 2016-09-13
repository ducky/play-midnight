/*global chrome */
(function () {
  'use strict';

  function getIcon(request, sender, cb) {
    var context;
    var img = document.createElement('img');
    var canvas = document.createElement("canvas");
    var width = 96;
    var height = 96;

    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('crossOrigin', 'anonymous');
    context = canvas.getContext("2d");

    img.addEventListener('load', createIcon);
    img.src = request.url;

    function createIcon() {
      var icon;

      // Create Colored Icon
      context.drawImage(img, 0, 0);
      context.globalCompositeOperation = "source-in";
      context.fillStyle = request.color;
      context.fillRect(0, 0, width, height);
      context.fill();

      icon = canvas.toDataURL();

      console.log(icon);

      cb({ url: icon });
    }

    return true;
  }
  chrome.runtime.onMessage.addListener(getIcon);
}());
