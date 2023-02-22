import { qS, localString } from "./utils.js"

// TRADUTTORE CONTENUTI PAGINA
const url = location.href
const lang = localStorage.getItem("language")


const traslator = () => {
    // HOME
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
    }

    // CHECKOUT

}

export default traslator