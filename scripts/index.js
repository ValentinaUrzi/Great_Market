import lang from "./language.js";
import exportCat from "./categories.js";
import card from "./card.js";
import modalGen from "./modal.js";
import cart from "./cart.js";
import traslator from "./translator.js";

const url = location.href



lang()
cart()
traslator()
exportCat()
if (url.includes('index.html')) {
    card()
}
modalGen()