const getIcon = ({ accent, url }, sender, cb) => {
  const img = new Image();

  img.onload = function() {
    const canvas = document.createElement('canvas');

    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    canvas.setAttribute('crossOrigin', 'anonymous');

    const context = canvas.getContext('2d');

    // Create Colored Icon
    context.drawImage(this, 0, 0);
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = accent;
    context.fillRect(0, 0, this.naturalWidth, this.naturalHeight);
    context.fill();

    const icon = canvas.toDataURL();

    console.log(icon);

    cb({ url: icon });
  };

  img.src = url;

  return true;
};

chrome.runtime.onMessage.addListener(getIcon);
