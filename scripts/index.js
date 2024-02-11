// let handleClick = () => {

// }

import navbar from "../components/navbar.js";
let navContainer = document.querySelector("#navbar");
navContainer.innerHTML = navbar()

let todoArr = JSON.parse(localStorage.getItem("todos")) || [];
let handleClickBtn = document.querySelector("#handleClick");
handleClickBtn.addEventListener("click",handleClick);

function handleClick(){
    // alert('I am clicked');

    let value = document.querySelector("#toDo__input").value;
    // console.log(value);

    if(!value){
        alert("Type a valid statement!");
        return;
    }

    //Create payload : which is basically the data
    let payload = {
        todo : value,
        status : false,
        id : Date.now() + " " + value,
    }

    todoArr.push(payload);
    // console.log(todoArr);
    localStorage.setItem("todos",JSON.stringify(todoArr));
    // window.location.reload();
    // appendToDo(); (calling the function here is better instead of line 28 but check the error)
    appendToDo();
}

appendToDo();

function appendToDo(){
    let container = document.querySelector(".allToDo__div");
    container.innerHTML = null;
    todoArr.map( (ele,i) => {
        //Creating the html tags

        let mainDiv = document.createElement("div");
        let todoDiv = document.createElement("div");
        let toggleDiv = document.createElement("div");
        let deleteDiv = document.createElement("div");

        let todoH3 = document.createElement("h3");
        let toggleButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        //Adding attributes
        todoH3.innerText = ele.todo;

        if(ele.status){
            toggleButton.innerText = "Done";
            toggleButton.style.backgroundColor = "green";
        }else{
            toggleButton.innerText = "Not Done";
            toggleButton.style.backgroundColor = "red";
        }

        deleteButton.innerText = "Delete";

        //Adding style

        //Click events
        toggleButton.addEventListener('click', () => {
            updateToDo(ele.id);
        });

        deleteButton.addEventListener('click', () => {
            deleteTodo(ele.id);
        });

        //Append
        todoDiv.append(todoH3);
        toggleDiv.append(toggleButton);
        deleteDiv.append(deleteButton);
        mainDiv.append(todoDiv,toggleDiv,deleteDiv);
        container.append(mainDiv);

    });
}

function updateToDo(id){
    // console.log(id);
    // alert("Clicked");

    //Search the array and find the respective object

    //update
    //{status : true/false}

    //Nothing

    todoArr = todoArr.map((ele,i)=>{
        if(ele.id == id){
            //We can find our required obj
            // return {status : !ele.status , id : ele.id , todo : ele.todo };
            return {...ele, status : !ele.status};
        }else{
            //No match
            return ele;
        }
    });
    localStorage.setItem("todos",JSON.stringify(todoArr));
    appendToDo();
    // console.log(updatedTodoArr);
}

function deleteTodo(id){
    //Identify object
    // alert("I am clicked");
    todoArr = todoArr.filter((ele)=>{
        return ele.id != id;
    });
    localStorage.setItem("todos",JSON.stringify(todoArr));
    appendToDo();
}