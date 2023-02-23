import card from "./card.js"
import { catTranslator, cE, qS } from "./utils.js"

const cardContainerEl = qS(".card_container");
const loader = qS('.loader');
const catContainerEl = qS(".categories")

// POPOLAMENTO BARRA CATEGORIE (BYPASSANDO LA CAT 1)

const categories = () => {

    const catGen = async () => {
        const res = await fetch(`https://dummyjson.com/products/categories`)
        let data = await res.json();
        data.unshift("all")
        {
            data.forEach(data => {
                // SMARTPHONES HA ID 1
                if (!(data.includes("-") || data.includes("smartphones"))) {
                    const catTabEl = cE("button");
                    catTabEl.className = "category"
                    catTabEl.textContent = catTranslator(data);

                    // GENERATORE DI CARDS IN BASE ALLA CATEGORIA

                    catTabEl.onclick = async () => {
                        loader.style.display = 'block';
                        const res = await fetch(data === "all" ? ("https://dummyjson.com/products?limit=16") : (`https://dummyjson.com/products/category/${data}?limit=4`))
                        const cardCat = await res.json();
                        cardContainerEl.textContent = "";
                        loader.style.display = 'none';
                        cardCat.products.forEach((products) => {

                            const cardEl = cE(`div`)
                            cardEl.className = "card";

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

                            if (priceBrandContainer) priceBrandContainer.append(brand, price);
                            cartMessageContainer.append(cartMessageIcon, cartMessage);
                            cardOverlay.appendChild(cartMessageContainer);
                            cardEl.append(cardOverlay, title, cat, priceBrandContainer, img,);
                            cardContainerEl.appendChild(cardEl);
                        })

                    }
                    if (catContainerEl) catContainerEl.appendChild(catTabEl);
                }
            })
        }
    }

    catGen()

}


export default categories;    