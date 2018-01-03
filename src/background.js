const getIcon = ({ accent, url }, sender, cb) => {
  let context;
  const img = document.createElement('img');
  const canvas = document.createElement('canvas');
  const width = 96;
  const height = 96;

  const createIcon = () => {
    let icon;

    // Create Colored Icon
    context.drawImage(img, 0, 0);
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = accent;
    context.fillRect(0, 0, width, height);
    context.fill();

    icon = canvas.toDataURL();

    console.log(icon);

    cb({ url: icon });
  };

  canvas.width = width;
  canvas.height = height;
  canvas.setAttribute('crossOrigin', 'anonymous');
  context = canvas.getContext('2d');

  img.addEventListener('load', createIcon);
  img.src = url;

  return true;
};

chrome.runtime.onMessage.addListener(getIcon);
