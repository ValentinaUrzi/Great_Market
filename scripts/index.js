import lang from "./language.js";
import categories from "./categories.js";
import card from "./card.js";
import modalGen from "./modal.js";
import cart from "./cart.js";
import traslator from "./translator.js";
import checkout from "./checkout.js";

const url = location.href

lang()
cart()
checkout()
traslator()
if (url.includes('index.html')) {
    categories()
    card()
}
modalGen()