const body = document.querySelector("body");
const IMG_NUMBER = 5;

function loadImage(imgNumber){
    const image = new Image();
    image.src = `bg_image/${imgNumber + 1}.jpg`;
    //무작위로 산출된 숫자가 0에서 4까지 이기 때문에 1씩 더해서 1부터 5까지의 이미지 번호 만든다
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genNumber(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    //0이상 1미만의 수 나오면 거기다 5 곱해서 정수만 산출 (즉 0부터 4까지 나옴)
    return number;
}

function init(){
    const randomNumber = genNumber();
    loadImage(randomNumber);
}

init();