import { qS, localString } from "./utils.js"

// TRADUTTORE CONTENUTI PAGINA
const url = location.href
const lang = localStorage.getItem("language")

// STRINGHE GLOBALI
const traslator = () => {
    localString("login")
    localString("cart_text")
    localString("search", "placeholder")
    localString("user")
    localString("geolocal")
    localString("modal_title")
    localString("username")
    localString("sub_btn", "value")
    localString("terms")
    localString("privacy")
    localString("ads")

    // CARRELLO
    if (url.includes("cart")) {
        document.title = lang === "it_IT" ? "Carrello Great Market" : "Great Market Cart"
        localString("empty_cart_mess")
        localString("checkout_btn")
    }

    // CHECKOUT
    if (url.includes("checkout")) {
        document.title = lang === "it_IT" ? "Pagamento Great Market" : "Great Market Checkout"
        localString("address_text")
        localString("payment_method")
        localString("total_text")
        localString("pay_btn")
        localString("success_message")
    }
}

export default traslator