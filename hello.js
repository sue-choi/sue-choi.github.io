const userContainer = document.querySelector(".js-user");
const userInput = userContainer.querySelector("input");
const userHello = document.querySelector(".js-user-hello");
const USER_LS = "currentUser";
const SHOW_CN = "showing";
const currentUser = localStorage.getItem(USER_LS);

function saveUser(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = userInput.value;
    loadUser(currentValue);
    saveUser(currentValue);
}

function askUser(){
    userContainer.classList.add(SHOW_CN);
    userContainer.addEventListener("submit", handleSubmit);
}

function loadUser(text){
    userContainer.classList.remove(SHOW_CN);
    userHello.classList.add(SHOW_CN);
    userHello.innerText = `Hello ${text}`;
}

function helloUser(){
    if(currentUser === null){
        askUser();
    } else {
        loadUser(currentUser);
    }
}

function init(){
    helloUser();
}

init();