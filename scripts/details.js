import navbar from "../components/navbar.js";
let navContainer = document.querySelector("#navbar");
navContainer.innerHTML = navbar()

// let obj = {
//     name : "Masai",
//     printName: function(){

//     },
//     append: function(){

//     }
// }

//Create an object - use class
// class Details {
//     constructor(name){
//         this.name = name;
//     }

//     printName (){
//         console.log(this.name);
//     }

//     append(){

//     }

//     clickAddToCart(){

//     }

// }

// const details = new Details("Masai School");
// console.log(details.printName());
// details.printName();

// this = {
//     name : "Masai School",
// }

// console.log(name);
// console.log(data.name);

//STATE NAME
const data = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
]

const stateNameRenderring = (data) => {

    const select = document.querySelector("#stateName__select");
    data.map((ele)=>{
        const option = document.createElement("option");

        option.innerText = ele;
        option.value = ele;

        select.append(option);
    })
}
stateNameRenderring(data);

const cardDetailsRenderring = () => {
    // alert("Change");
    const value = document.querySelector("#paymentMethod__select").value;
    const container = document.querySelector("#cardDetails__div");
    // alert(value);

    if(value !== "card"){
        //Do nothing
        container.innerHTML = null;
    }else{
        //Append input for card details

        //Create HTML

        //Append

        //OR

        const html = `<label for="">Card Number</label>
        <input type="text" id="cardNumber">

        <label for="">CVV</label>
        <input type="text" id="cvv">

        <label for="">Expiry Date</label>
        <input type="date" id="expDate">

        <label for="">Card Holder Name</label>
        <input type="text" id="cardHolderName">`;

        container.innerHTML = html;

    }
}

const paymentSelect = document.querySelector("#paymentMethod__select");
paymentSelect.addEventListener("change",cardDetailsRenderring);

const handleSubmit = (event) => {
    //Prevent Default
    event.preventDefault();

    // console.log("I am clicked");
    const name = document.querySelector("#name").value;
    const address1 = document.querySelector("#address1").value;
    const address2 = document.querySelector("#address2").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#stateName__select").value;
    const pin = document.querySelector("#pin").value;
    const phone = document.querySelector("#phone").value;
    const paymentMode = document.querySelector("#paymentMethod__select").value;
    // const cardNumber = document.querySelector("#cardNumber").value;
    // const cvv = document.querySelector("#cvv").value;
    // const expDate = document.querySelector("#expDate").value;
    // const cardHolderName = document.querySelector("#cardHolderName").value;
    let cardNumber;
    let cvv;
    let expDate;
    let cardHolderName;

    //validation
    if(!name || !address1 || !address2 || !state || !pin || !phone || !city || !paymentMode){
        alert("Empty Input!");
        return;
    }
    if(paymentMode === "card"){

        cardNumber = document.querySelector("#cardNumber").value;
        cvv = document.querySelector("#cvv").value;
        expDate = document.querySelector("#expDate").value;
        cardHolderName = document.querySelector("#cardHolderName").value;
         
        if(!cardNumber || !cvv || !expDate || !cardHolderName){
            alert("Invalid Card Details!")
            return;
        }
    }
    //making payload or data in obj
    const payload = {
        name,
        address1,
        address2,
        city,
        state,
        pin,
        phone,
        paymentMode,
    }

    if(paymentMode === "card"){
        payload.paymentDetails = {
            cardNumber,
            cvv,
            expDate,
            cardHolderName
        }
    }

    const price = JSON.parse(localStorage.getItem("total"));
    payload.totalPrice = price;

    console.log(payload);
    //post request to store it in database / store it in local storage
    localStorage.setItem("orderDetails",JSON.stringify(payload)); 
    //redirecting if required
    window.location.href = "otp.html";

} 

const form = document.querySelector("#details__form");
form.addEventListener("submit", handleSubmit);


