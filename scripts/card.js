import { cE, qS } from "./utils.js";

const card = () => {

    const cardContainerEl = qS(".card_container");
    const loader = qS('.loader');
    const modal = qS("#modal");
    const loginControl = localStorage.getItem("isLogged");

    // GENERATORE DI CARDS GENERICHE

    const cardGen = async () => {
        loader.style.display = 'block';
        const res = await fetch(`https://dummyjson.com/products?limit=16`)
        const data = await res.json();
        data.products.forEach((products) => {

            const cardEl = cE(`div`)
            cardEl.className = "card";
            cardEl.onclick = () => {
                if (loginControl !== "true") {
                    modal.style.display = "flex";
                    modal.openedBy = "login";

                    const cart = JSON.parse(localStorage.getItem("cart")) || []
                    localStorage.setItem("cart")
                }
            }


            const cardOverlay = cE(`div`)
            cardOverlay.className = "card_overlay";

            const cartMessageContainer = cE(`div`)
            cartMessageContainer.className = "cart_mess_cont";

            const cartMessageIcon = cE(`img`)
            cartMessageIcon.className = "shopping_cart";
            cartMessageIcon.src = "../assets/img/icons/cart.png"

            const cartMessage = cE(`p`)
            cartMessage.className = "cart_mess";
            cartMessage.textContent = "Aggiungi al carrello";

            const title = cE(`h2`)
            title.className = "card_title";
            title.textContent = products.title;

            const cat = cE(`h3`)
            cat.className = "card_cat";
            cat.textContent = products.category;


            const priceBrandContainer = cE(`div`)
            priceBrandContainer.className = "card_price_brand";

            const brand = cE(`p`)
            brand.className = "card_brand";
            brand.textContent = products.brand;

            const price = cE(`p`)
            price.className = "card_price";
            price.textContent = "€ " + products.price;

            const img = cE(`img`)
            img.className = "card_img";
            img.src = products.images[1] ? products.images[1] : products.images[0];


            loader.style.display = 'none';

            priceBrandContainer.append(brand, price);
            cartMessageContainer.append(cartMessageIcon, cartMessage);
            cardOverlay.appendChild(cartMessageContainer);
            cardEl.append(cardOverlay, title, cat, priceBrandContainer, img);
            if (cardContainerEl) cardContainerEl.appendChild(cardEl);
        })
    }
    cardGen();
}

export default card;