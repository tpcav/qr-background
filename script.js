const form = document.getElementById('generate-form');

var qrcode = new QRCode("qrcode");

function makeCode () {    
  var elText = document.getElementById("url");
  
  if (!elText.value) {
    alert("Input a text");
    elText.focus();
    return;
  }
  
  qrcode.makeCode(elText.value);
}

makeCode();

// Create save button to download QR code as image
function createSaveBtn(saveUrl) {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
}

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");
  const generateButton = document.getElementById("generate-button");
  const saveButton = document.getElementById("save-button");
  
  canvas.width = 1170;
  canvas.height = 2532;

  generateButton.addEventListener("click", function() {
    const gradient = ctx.createLinearGradient(0, 0, 0, 2532);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, getRandomColor());
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1170, 2532);
  });

  saveButton.addEventListener("click", function() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "background.png";
    link.href = dataURL;
    link.click();
  });

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
});

