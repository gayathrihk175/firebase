//Catch the form
//Add event to it
//Define a function
//Prevent the default behaviour of form

import navbar from "../components/navbar.js";
let navContainer = document.querySelector("#navbar");
navContainer.innerHTML = navbar()


let form = document.querySelector("#registration__form").addEventListener("submit", handleSubmit);
function handleSubmit(event){
    event.preventDefault();
    // console.log('I am clicked');

    //Get the values of input
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let number = document.querySelector("#number").value;
    let password = document.querySelector("#password").value;

    //Add some validation
    if(!name || !email || !number || !password){
        alert("Fill in all the fields!");
        return;
    }

    email = "eve.holt@reqres.in";
    password = "pistol";

    //Create the payload
    let payload = {
        email,
        password
    }

    //POST Request
    //link - https://reqres.in/api/register

    //Two types - .then .catch || async await
    //By default a request is GET , so you will have to specifically mention that it is a POST request
    //1.Method Name (POST , PATCH , DELETE)
    //2.Headers
    //3.Data
    fetch("https://reqres.in/api/register" , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payload),
    }).then((res)=>{
        //Pending
        return res.json();
    }).then((res)=>{
        //Resolved
        console.log(res);
        alert(`Success - ${res.token}`)

        //Move or redirect user to login page
        window.location.href = "./login.html";

    }).catch((err)=>{
        //Rejected
        console.log(err);
        alert("Registration Failed");
    })


    //End goal is to make a post request
}