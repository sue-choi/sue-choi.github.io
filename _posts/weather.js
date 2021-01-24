const weather = document.querySelector(".js-weather");

//좌표 = coordinate / 위도 = latitude / 경도 = longitude
const API_KEY = "02908efcd23220024b39038f3cbfce93";
const COORDS = "coords";

function getCoords(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    //새로고침없이 항상 데이터가 refresh됨 -> JS의 강점
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C In ${place}`;
    });
}

function saveCoords(text){
    localStorage.setItem(COORDS, JSON.stringify(text));
}

function getGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //navigator.geolocation.getCurrentPosition의 property에 
    //coords, latitude, longitude 있는 듯
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    }
    saveCoords(coordsObj);
    getCoords(latitude, longitude);
}

function getGeoError(){
    console.log("We can't find your geo location");
}

function askCoords(){
    navigator.geolocation.getCurrentPosition(getGeoSuccess, getGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getCoords(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();