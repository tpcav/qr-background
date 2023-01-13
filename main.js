const data = document.querySelector('#textData');
const qrCode = document.querySelector('#qrCode');
const qrGenerator = document.querySelector('#qrGenerator');
const qrBackground = document.querySelector('.qrBackground');
const saveButton = document.getElementById('saveButton');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const baseURL = "https://api.qrserver.com/v1/create-qr-code/";


window.onload = function() {
  function randomBackground() {
    var color1 = getRandomColor();
    var color2 = getRandomColor();
    var color3 = getRandomColor();
    qrBackground.style.background = "linear-gradient(150deg, " + color1 + " 0%, " + color2 + " 100%, " + color3 + " 100%)";
    const randomBackgroundColor = window.getComputedStyle(qrBackground).backgroundColor;
    ctx.drawImage(randomBackgroundColor, canvas.width, canvas.height);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.querySelector("#randColor").addEventListener("click", randomBackground);

  qrGenerator.addEventListener('click',()=>{
    const size = `350x350`
    const img = new Image();
    img.src = `${baseURL}?/size=${size}&data=${data.value}&format=svg`;
    img.crossOrigin = "anonymous";
    img.onload = function() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight    

      img.width = '100';
      img.height = '100';

      const centerX = canvas.width / 2 - (img.width / 2);
      const centerY = canvas.height / 2 - (img.height / 2);

      ctx.drawImage(img, centerX, centerY, img.width, img.height);
    };
  })
  

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
}
