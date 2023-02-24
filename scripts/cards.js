import { catTranslator, cE, qS } from "./utils.js";

const cards = () => {

    const cardContainerEl = qS(".card_container");
    const loader = qS('.loader');
    const modal = qS("#modal");
    const cartQuant = qS(".quantity");

    const lang = localStorage.getItem("language")
    const loginControl = localStorage.getItem("isLogged");

    // GENERATORE DI CARDS GENERICHE

    const cardGen = async () => {
        loader.style.display = 'block';
        const res = await fetch(`https://dummyjson.com/products?limit=16`)
        const data = await res.json();
        data.products.forEach((products) => {

            const cardEl = cE(`button`)
            cardEl.className = "card";

            // AGGIUNGERE ARTICOLO AL CARRELLO 
            cardEl.onclick = () => {
                let itemCart = {
                    id: products.id,
                    title: products.title,
                    brand: products.brand,
                    image: products.images[1] ? products.images[1] : products.images[0],
                    price: products.price,
                    category: products.category,
                    qnty: 1
                }

                const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";
                let cart = JSON.parse(localStorage.getItem("cart")) || []
                if (parseInt(cartQuantStorage) >= 9) {
                    cartQuant.style.left = "28px"
                }

                localStorage.setItem("cart_quantity", parseInt(cartQuantStorage) + 1)

                // AGGIUNGO O INCREMENTO QUANTITA' ARTICOLI CONTROLLANDO ID DUPLICATI
                let cartControl = cart.find(element => element.id === products.id);
                if (cartControl) {
                    cart = cart.map(element => {
                        if (element.id === products.id) {
                            element.qnty = element.qnty + 1;
                        }
                        return element
                    })
                }
                else {
                    cart.push(itemCart);
                }
                localStorage.setItem("cart", JSON.stringify(cart))
                if (loginControl !== "true") {
                    modal.style.display = "flex";
                    modal.openedBy = "login";

                } else {
                    cartQuant.textContent = parseInt(cartQuantStorage) + 1
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
            cartMessage.textContent = lang === "it_IT" ? "Aggiungi al carrello" : "Add to Cart";

            const title = cE(`h2`)
            title.className = "card_title";
            title.textContent = products.title.slice(0, 19);

            const cardCatBrand = cE(`div`)
            cardCatBrand.className = "card_cat_brand";

            const cat = cE(`h3`)
            cat.className = "card_cat";
            cat.textContent = lang === "it_IT" ? catTranslator(products.category) : products.category;

            const priceBrandContainer = cE(`div`)
            priceBrandContainer.className = "card_price_brand";

            const brand = cE(`p`)
            brand.className = "card_brand";
            brand.textContent = products.brand.slice(0, 15);

            const priceContainer = cE(`div`)
            priceContainer.className = "card_price_container";

            const price = cE(`p`)
            price.className = "card_price";
            price.textContent = "€ " + products.price;

            const priceDiscounted = cE(`p`)
            priceDiscounted.className = "card_price_discount";
            priceDiscounted.textContent = "- " + products.discountPercentage + "%";

            const img = cE(`img`)
            img.className = "card_img";
            img.src = products.images[1] ? products.images[1] : products.images[0];


            loader.style.display = 'none';
            priceContainer.append(price, priceDiscounted)
            priceBrandContainer.appendChild(priceContainer);
            cartMessageContainer.append(cartMessageIcon, cartMessage);
            cardOverlay.appendChild(cartMessageContainer);
            cardCatBrand.append(brand, cat)
            cardEl.append(cardOverlay, img, title, cardCatBrand, priceBrandContainer);
            if (cardContainerEl) cardContainerEl.appendChild(cardEl);
        })
    }
    cardGen();
}

export default cards;