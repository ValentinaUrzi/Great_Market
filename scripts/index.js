import lang from "./language.js";
import categories from "./categories.js";
import cards from "./cards.js";
import modalGen from "./modal.js";
import cart from "./cart.js";
import traslator from "./translator.js";
import checkout from "./checkout.js";

const url = location.pathname;

lang()
cart()
if (url === '/checkout.html') {
    checkout()
}
traslator()
if (url === "/" || url === "/index.html") {
    categories()
    cards()
}
modalGen()