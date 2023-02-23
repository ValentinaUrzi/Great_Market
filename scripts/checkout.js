import { cE, qS } from "./utils.js"

const checkout = () => {
    const loginControl = localStorage.getItem("isLogged");
    const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";

    const loader = qS('.loader');

    const url = location.href

    // SE NON SONO LOGGATO REDIRECT
    if (url.includes("checkout") && (loginControl !== "true" || cartQuantStorage === "0")) {
        location.replace("/");
    }

    // MODALE DI PAGAMENTO
    const successModal = qS("#success_modal");
    const openModalBtn = qS("#open_modal");
    const closeModalBtn = qS(".close");

    openModalBtn.onclick = () => {
        loader.style.display = 'block';
        setTimeout(() => {
            loader.style.display = 'none';
            successModal.style.display = "block";
        }, 800)
    };

    closeModalBtn.onclick = () => {
        successModal.style.display = "none"
        localStorage.removeItem("cart_quantity");
        localStorage.removeItem("cart");
        location.replace("/");
    };

    window.onclick = (event) => {
        if (event.target == successModal) {
            successModal.style.display = "none";
        }
    };
}

export default checkout;