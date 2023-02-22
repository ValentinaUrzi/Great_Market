import { cE, qS } from "./utils.js";

const card = () => {

    const cardContainerEl = qS(".card_container");
    const loader = qS('.loader');


    const cardGen = async () => {
        loader.style.display = 'block';
        const res = await fetch(`https://dummyjson.com/products?limit=8`)
        const data = await res.json();
        data.products.forEach((products) => {
            const cardEl = cE(`div`)
            cardEl.className = "card";
            const cardElTitle = cE(`h2`)
            cardElTitle.className = "card_title";
            cardEl.textContent = products.title;
            loader.style.display = 'none';
            cardEl.appendChild(cardElTitle);
            cardContainerEl.appendChild(cardEl);
        })
    }
    cardGen();
}
export default card;