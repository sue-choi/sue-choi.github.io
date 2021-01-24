const clockContainer = document.querySelector(".js-clock");
const clockRealTime = clockContainer.querySelector(".js-time");

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockRealTime.innerText = `${hours < 10 ? `0${hours}`: hours} : ${minutes < 10 ? `0${minutes}`: minutes} : ${seconds < 10 ? `0${seconds}`: seconds}`;
}

function loadTime(){
    getTime();
    setInterval(getTime ,1000);
}

function init(){
    loadTime();
}

init();