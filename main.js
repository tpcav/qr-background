const data = document.querySelector('#textData');
const qrCode = document.querySelector('#qrCode');
const qrGenerator = document.querySelector('#qrGenerator');
const qrBackground = document.querySelector('.qrBackground');
const saveButton = document.getElementById('saveButton');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const baseURL = "https://api.qrserver.com/v1/create-qr-code/";

window.onload = function() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Create linear gradient
  const gradient = ctx.createLinearGradient(500, 0, canvas.width, canvas.height);
  gradient.addColorStop(0.5, "LightSkyBlue");
  gradient.addColorStop(0, "SteelBlue");
  gradient.addColorStop(1, "RoyalBlue");
  

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  qrGenerator.addEventListener('click',()=>{
    const size = `350x350`
    const img = new Image();
    img.src = `${baseURL}?/size=${size}&data=${data.value}&format=svg`;
    img.crossOrigin = "anonymous";
    img.onload = function() {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Create linear gradient
      const gradient = ctx.createLinearGradient(500, 0, canvas.width, canvas.height);
      gradient.addColorStop(0.5, "LightSkyBlue");
      gradient.addColorStop(0, "SteelBlue");
      gradient.addColorStop(1, "RoyalBlue");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      img.width = '100';
      img.height = '100';

      const centerX = canvas.width / 2 - (img.width / 2);
      const centerY = 300 - (img.height / 2);

      ctx.drawImage(img, centerX, centerY, img.width, img.height);
    };
  });

  const randomColor = document.getElementById('randColor');

  randomColor.addEventListener('click', function() {
    // Generate two random colors for the gradient
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    // Create linear gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  ctx.drawImage(img, centerX, centerY, img.width, img.height);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

saveButton.addEventListener('click', function() {
  // Get the dataURL of the canvas
  const dataURL = canvas.toDataURL();
  console.log(dataURL);
  // Create a link to download the image
  const link = document.createElement('a');
  link.download = 'QR-code.png';
  link.href = dataURL;
  // Click the link to trigger the download
  link.click();
});
