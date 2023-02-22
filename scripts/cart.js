import { cE, qS } from "./utils.js";

const cart = () => {

    const loginControl = localStorage.getItem("isLogged");
    const cartBtn = qS(".cart_container");
    const cartContainer = qS(".cart_page");
    const emptyCartContainer = cE("div")
    emptyCartContainer.className = "empty_cart";
    const emptyCartMessage = cE("h2");
    emptyCartMessage.className = "empty_cart_mess";
    emptyCartMessage.textContent = "Your cart is empty";
    const url = location.href

    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

    if (url.includes("cart")) loginControl !== "true" && location.replace("index.html")

    if (cartStorage.length === 0) {
        emptyCartContainer.appendChild(emptyCartMessage);
        if (cartContainer)
            cartContainer.appendChild(emptyCartContainer);
    }

    cartBtn.onclick = () => {
        if (loginControl == "true") location.assign("cart.html");
        else {
            const modal = qS("#modal");
            modal.openedBy = "cart";
            modal.style.display = "flex";
        }
    }
}

export default cart
