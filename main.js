const data = document.querySelector('#textData');
const qrCode = document.querySelector('#qrCode');
const qrGenerator = document.querySelector('#qrGenerator');
const qrBackground = document.querySelector('.qrBackground');
const saveButton = document.querySelector('#saveButton');
const baseURL = "https://api.qrserver.com/v1/create-qr-code/";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

qrGenerator.addEventListener('click',()=>{
  const size = `350x350`
  qrCode.src = `${baseURL}?/size=${size}&data=${data.value}`
  if (data.value == "") {
      qrCode.src = "QRdefault.png"
      saveButton.disabled = true;
      alert('Please enter a URL.');
  } else {
      saveButton.disabled = false;
  }
  // Add class to show QR code
  qrCode.classList.add("show-on-save");
})

function randomBackground() {
    var color1 = getRandomColor();
    var color2 = getRandomColor();
    var color3 = getRandomColor();
    qrBackground.style.background = "linear-gradient(150deg, " + color1 + " 0%, " + color2 + " 100%, " + color3 + " 100%)";
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
saveButton.addEventListener("click", saveImage);

function saveImage() {
    // Set canvas size to match QR code background
    canvas.width = qrBackground.clientWidth;
    canvas.height = qrBackground.clientHeight;

    // Draw QR code background image on canvas
    ctx.drawImage(qrBackground, 10, 10);

    // Draw QR code image on canvas
    ctx.drawImage(qrCode);

    // Save canvas as PNG image
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code-background.png";
    link.click();
}

function savePageAsImage() {
  //hide elements
  document.querySelectorAll('.container, .submitButtons').forEach(function(el) {
    el.classList.add('hide-on-save');
  });
  // Capture the current state of the page
  html2canvas(document.body).then(function(canvas) {
      // Convert the canvas to a PNG image
      var imgData = canvas.toDataURL('image/png');
      // Show the elements again
      document.querySelectorAll('.container, .submitButtons').forEach(function(el) {
        el.classList.remove('hide-on-save');
      });
      // Save the image to the user's device
      var link = document.createElement('a');
      link.download = 'QR-Background.png';
      link.href = imgData;
      link.click();
  });
}
