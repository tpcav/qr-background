const data = document.querySelector('#textData');
const qrCode = document.querySelector('#qrCode');
const qrGenerator = document.querySelector('#qrGenerator');

const baseURL = "https://api.qrserver.com/v1/create-qr-code/"

qrGenerator.addEventListener('click',()=>{
    const size = `350x350`
    qrCode.src = `${baseURL}?/size=${size}&data=${data.value}`

    if (data.value == "") {
        qrCode.src = "QRdefault.png"
        alert('Please enter a URL.');
    }
})

function randomBackground() {
  var color1 = getRandomColor();
  var color2 = getRandomColor();
  var color3 = getRandomColor();
  var bgDiv = document.querySelector(".qrBackground");
    bgDiv.style.background = "linear-gradient(150deg, " + color1 + " 0%, " + color2 + " 100%, " + color3 + " 100%)";
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


