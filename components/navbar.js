import loginCheck from "../utils/loginCheck.js";

function navbar(length=0) {

    let cartArr = JSON.parse(localStorage.getItem("cart"));

    if(cartArr){
        length = cartArr.length;
    }
    const status = loginCheck();
    if(!status){
        length = null;
    }

    return `    <div class="navbar__div">
    <div>
        <h1>
            <a href="./index.html">ToDo App</a>
        </h1>
    </div>

    <div>
        <ul>
            <li>Home</li>
            <li><a href="./index.html">ToDo</a></li>
            <li><a href="./product.html">Products</a></li>
            <li><a href="./register.html">Register</a></li>
            <li>
                <h4>
                    <a href="./cart.html">${length === null ? `Cart` : `Cart : ${length}`}</a>
                </h4>
            </li>
        </ul>
    </div>
</div>`
}

export default navbar;
