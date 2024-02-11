import navbar from "../components/navbar.js";

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


class Details {
    constructor(){

    }
    stateNameRenderring(data){
        const select = document.querySelector("#stateName__select");
        data.map((ele)=>{
            const option = document.createElement("option");
    
            option.innerText = ele;
            option.value = ele;
    
            select.append(option);
        })
    }
    cardDetailsRenderring(){
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
    navbarRenderring(){
        let navContainer = document.querySelector("#navbar");
        navContainer.innerHTML = navbar()
    }
    #checkCvv(cvv){
        if(cvv.length === 3){
            return true;
        }

        return false;
    }

    #isBasicDataPresent(name,address1,address2,city,state,pin,phone,paymentMode){
        if(!name || !address1 || !address2 || !state || !pin || !phone || !city || !paymentMode){
            alert("Empty Fields!");
            return false;
        }
        
        return true;
    }

    handleSubmit(name,address1,address2,city,state,pin,phone,paymentMode,cardNumber,cvv,expDate,cardHolderName){
        const isValidationCheck = this.#checkCvv(cvv) && this.#isBasicDataPresent(name,address1,address2,city.state,pin,phone,paymentMode );
        // const payload = {
        //     name,
        //     address1,
        //     address2,
        //     city,
        //     state,
        //     pin,
        //     phone,
        //     paymentMode,
        // }

        // payload.name = name;
        this.name = name;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.pin = pin;
        this.phone = phone;
        this.paymentMode = paymentMode;
    
        if(paymentMode === "card"){
            // payload.paymentDetails = {
            //     cardNumber,
            //     cvv,
            //     expDate,
            //     cardHolderName
            // }
            this.paymentDetails = {
                cardNumber ,
                cvv,
                expDate,
                cardHolderName
            }
        }



        const price = JSON.parse(localStorage.getItem("total"));
        this.totalPrice = price;

        localStorage.setItem("orderDetails",JSON.stringify(this)); 
        window.location.href = "otp.html";

    }

}

const details = new Details();
details.navbarRenderring();
details.stateNameRenderring(data );

// details.navbarRenderring();
// details.stateNameRenderring();

//After an event trigger
const paymentSelect = document.querySelector("#paymentMethod__select");
paymentSelect.addEventListener("change", () => {
    details.cardDetailsRenderring();
});

const form = document.querySelector("#details__form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const address1 = document.querySelector("#address1").value;
    const address2 = document.querySelector("#address2").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#stateName__select").value;
    const pin = document.querySelector("#pin").value;
    const phone = document.querySelector("#phone").value;
    const paymentMode = document.querySelector("#paymentMethod__select").value;

    if(paymentMode !== "card"){
        details.handleSubmit(name,address1,address2,city,state,pin,phone,paymentMode);
        return;
    }
    if(paymentMode == "card"){
        const cardNumber = document.querySelector("#cardNumber").value;
        const cvv = document.querySelector("#cvv").value;
        const expDate = document.querySelector("#expDate").value;
        const cardHolderName = document.querySelector("#cardHolderName").value;
        details.handleSubmit(name,address1,address2,city,state,pin,phone,paymentMode,cardNumber,cvv,expDate,cardHolderName);
    }

    // details.handleSubmit();
})
