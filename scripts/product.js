// const url = "https://fakestoreapi.com/products";

//Make a network request-GET
//Need to get data
//Append

import loginCheck from "../utils/loginCheck.js";

import navbar from "../components/navbar.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCartLength(cart){
    let length = cart.length;
    let navContainer = document.querySelector("#navbar");
    navContainer.innerHTML = navbar(length);


}
renderCartLength(cart)
async function getData(){
    try {
        let url = await fetch(`https://fakestoreapi.com/products`);
        let data = await url.json();
        appendData(data);
        console.log('data:',data);
    } catch (error) {
        console.log('error:',error);
    }
}
getData()

function appendData(data){
    let container = document.querySelector(".product__div");
    container.innerHTML = null;

    data.map((ele)=>{

        //Creating html elements
        let mainDiv = document.createElement("div");
        let imageDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        let image = document.createElement("img");
        let categoryP = document.createElement("p");
        let priceP = document.createElement("p");
        let buttonDiv = document.createElement("div");
        let button = document.createElement("button");
        let cartButton = document.createElement("button");

        //Attributes
        image.src = ele.image;
        categoryP.innerText = ele.category;
        priceP.innerText = ele.price;
        button.innerText = "Buy";
        cartButton.innerText = "Add to Cart";

        mainDiv.style.border = "1px solid silver";
        mainDiv.style.paddingBottom = "1rem";
        button.style.backgroundColor = "red";
        cartButton.style.backgroundColor = "teal";

        //Click events
        button.addEventListener("click", buyButtonClick);
        cartButton.addEventListener("click", () => {
            handleAddToCart(ele);
        });

        //Appending
        imageDiv.append(image);
        buttonDiv.append(button,cartButton);
        contentDiv.append(categoryP,priceP,buttonDiv);
        mainDiv.append(imageDiv,contentDiv);
        container.append(mainDiv);
    })

}

function buyButtonClick(){
    // alert("Clicked");
    setTimeout(()=>{
        alert("Successfully added to cart!");
        setTimeout(()=>{
            alert("Payment Done!");
            setTimeout(()=>{
                alert("Order Delivered");
            },2000)
        },3000)
    },2000)
}

function handleAddToCart(data){
    // alert("Item added");
    console.log(data);

    const status = loginCheck();
    if(!status){
        alert("Not Logged In!");
        window.location.href="login.html";
        return;
    }

    let flag = false;
    cart.map((ele)=>{
        if(ele.id == data.id){
            flag = true;
        }
    })
    if(flag === true){
        alert("Already added!");
        return;
    }

    data.qty = 1;

    cart.push(data);
    localStorage.setItem("cart",JSON.stringify(cart));
    renderCartLength(cart);
    alert("Added to Cart!")
}