const listContainer = document.querySelector(".js-list-box");
const listInput = listContainer.querySelector("input");
const listUl = document.querySelector(".js-list");
const LIST_LS =  "currentList";
let toDos = []; // let으로 설정한 이유는 delList에 나와있음

function saveList(){
    localStorage.setItem(LIST_LS, JSON.stringify(toDos));
}

function delList(event){
    // console.log(event.target.parentNode);
    //delete 버튼이 콘솔창에 뜨지만 몇 번째 버튼인지 모르기 때문에 버튼의 부모요소인 li를 불러오려고 .parentNode를 추가한다 
    //(parentNode라는 요소명은 console.dir로 li를 지칭하는 이름을 찾음)
    const btn = event.target;
    const li = btn.parentNode;
    listUl.removeChild(li);
    //여기까지는 HTML에서 list 지우는 방법
    const refreshList = toDos.filter(function(element){
        return element.id !== parseInt(li.id);
    });
    //배열 toDos의 모든 요소들의 id가 li(delbtn의 부모인 li)의 id와 다른 모든 요소 반환
    //즉 버튼이 눌린 요소들 제외한 나머지 요소들을 새로운 배열로 반환
    //li.id가 string이기 때문에 parseInt로 숫자로 바꿔줌
    toDos = refreshList; //새로 만들어진 배열을 새로운 toDos 배열로 지정
    saveList(); //toDos 새로 지정되었으니까 다시 새로 저장
    //여기까지가 localStorage에서 list 지우는 방법
}

function addList(text){
    const li = document.createElement("li");
    const delbtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delbtn.innerText = "❌";
    delbtn.addEventListener("click", delList);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delbtn);
    li.id = newId;
    listUl.appendChild(li);
    const toDoObj = {
        name : text,
        id : newId
    }
    toDos.push(toDoObj);
    saveList();
}

function handleSubmit(event){
    event.preventDefault();
    const currentListValue = listInput.value;
    addList(currentListValue);
    listInput.value = "";
}

function loadList(){
    const currentList = localStorage.getItem(LIST_LS);
    if(currentList !== null){
        const parsedToDos = JSON.parse(currentList);
        parsedToDos.forEach(function(element){
            addList(element.name)
        });
    }
}

function init(){
    loadList(); //이미 로컬스토리지에 저장된 데이터를 가져오는 애
    listContainer.addEventListener("submit", handleSubmit);//새로 인풋에 입력되는 데이터를 로컬스토리지에 저장하는 애
}

init();