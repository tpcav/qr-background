
const data = document.querySelector('#textData');
const qrCode = document.querySelector('#qrCode');
const qrGenerator = document.querySelector('#qrGenerator');

const baseURL = "https://api.qrserver.com/v1/create-qr-code/"

qrGenerator.addEventListener('click',()=>{
    const size = `350x350`
    qrCode.src = `${baseURL}?/size=${size}&data=${data.value}`

    if (data.value == "") {
        qrCode.src = "/asset/QRdefault.png"
    }
})