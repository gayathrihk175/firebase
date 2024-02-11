import navbar from "../components/navbar.js";
import loginCheck from "../utils/loginCheck.js";
const status = loginCheck();
    if(!status){
        alert("Not Logged In!");
        window.location.href="login.html";
        // return;
    }
// let cartContainer = document.querySelector("#cartProducts__div");

let cartArray = JSON.parse(localStorage.getItem("cart"));
appendData(cartArray)
renderCartLength(cartArray)
totalPrice()

function renderCartLength(cart){
    let length = cart.length;
    
    let navContainer = document.querySelector("#navbar");
    navContainer.innerHTML = navbar(length);
}

function appendData(data){
    let container = document.querySelector("#cartProducts__div");
    container.innerHTML = null;

    data.map((ele)=>{
        // console.log(ele);
        const {qty , image:srcImage , category} = ele;
        //Creating html elements
        let mainDiv = document.createElement("div");
        let imageDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        let image = document.createElement("img");
        let categoryP = document.createElement("p");
        let priceP = document.createElement("p");
        let buttonDiv = document.createElement("div");
        // let button = document.createElement("button");
        let cartButton = document.createElement("button");
        let quantityP = document.createElement("p");
        let incrementQty = document.createElement("button");
        let decrementQty = document.createElement("button");

        //Attributes
        image.src = srcImage;
        categoryP.innerText = category;
        priceP.innerText = ele.price;
        // button.innerText = "Buy";
        cartButton.innerText = "Remove Product";

        mainDiv.style.border = "1px solid silver";
        mainDiv.style.paddingBottom = "1rem";
        // button.style.backgroundColor = "red";
        cartButton.style.backgroundColor = "teal";

        quantityP.innerText = `Quantity-${qty}`;
        incrementQty.innerText = "+";
        decrementQty.innerText= "-";
        incrementQty.style.backgroundColor = "green";
        decrementQty.style.backgroundColor ="red";

        //Click events
        // button.addEventListener("click", buyButtonClick);
        // cartButton.addEventListener("click", () => {
        //     handleAddToCart(ele);
        // });

        cartButton.addEventListener("click",()=>{
            handleRemoveFromCart(ele);
        })

        incrementQty.addEventListener("click",()=>{
            handleQuantity(ele , `+`);
        })
        decrementQty.addEventListener("click",()=>{
            handleQuantity(ele, `-`);
        })

        //Appending
        imageDiv.append(image);
        buttonDiv.append(cartButton,incrementQty,decrementQty);
        contentDiv.append(categoryP,priceP,quantityP,buttonDiv);
        mainDiv.append(imageDiv,contentDiv);
        container.append(mainDiv);
    })

}
function handleRemoveFromCart(data){
    console.log(data);

    cartArray = cartArray.filter((ele)=>{
        if(ele.id != data.id){
            return ele;
        }
    })
    localStorage.setItem("cart",JSON.stringify(cartArray));
    appendData(cartArray); 
    renderCartLength(cartArray);
    totalPrice()
    console.log(cartArray);
}

function totalPrice(){
    //Access what is present in the cart
    let sum = 0;
    cartArray.map((ele)=>{
        sum += ele.price * ele.qty;
        // console.log(sum);
        console.log(ele);
    })
    console.log(sum);
    //Catch the span
    let span = document.querySelector("#totalPrice__span");
    //Give textContent to it
    span.innerText = Math.round(sum);
    localStorage.setItem("total",JSON.stringify(Math.round(sum)));
}

const handleQuantity = (data,type) =>{
    if(type === "+"){

        if(data.qty === 5){
            alert("Can't add more than 5 products!");
            return;
        }

        data.qty = data.qty+1;
        appendData(cartArray);
        localStorage.setItem("cart",JSON.stringify(cart));
        totalPrice()
    }else{
        if(data.qty === 1){
            alert("Quantity can't be less than one");
            return
        }
        data.qty = data.qty-1;
        appendData(cartArray);
        localStorage.setItem("cart",JSON.stringify(cart));
        totalPrice()
    }
}

[
    {
        qty:2,
    },
    {
        qty:1,
    },
    {
        qty:1
    }
]

