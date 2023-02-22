import { cE, qS } from "./utils.js";

const cart = () => {

    const loginControl = localStorage.getItem("isLogged");
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";

    const cartQuant = qS(".quantity");
    const cartBtn = qS(".cart_container");
    const cartContainer = qS(".cart_page");
    const cartTotal = qS(".total");
    const checkoutBtn = qS(".checkout_btn");

    const url = location.href

    const emptyCartMessage = cE("h2");
    emptyCartMessage.className = "empty_cart_mess";
    emptyCartMessage.textContent = "Your cart is empty";

    // SE NON SONO LOGGATO REDIRECT AD HOMEPAGE DAL CARRELLO
    if (url.includes("cart")) loginControl !== "true" && location.replace("index.html")

    // SE NON HA PRODOTTI MOSTRO MESSAGGIO CARRELLO VUOTO
    if (parseInt(cartQuantStorage) === 0) {
        const defaultCartContainer = cE("div")
        defaultCartContainer.className = "empty_cart";
        defaultCartContainer.appendChild(emptyCartMessage);
        if (cartContainer)
            cartContainer.appendChild(defaultCartContainer);
    } else {

        // INSERIMENTO PRODOTTI NEL CARRELLO
        cartStorage.forEach(products => {
            const defaultCartContainer = cE("div")
            defaultCartContainer.className = "not_empty_cart";

            const img = cE(`img`)
            img.className = "cart_card_image";
            img.src = products.image

            const title = cE(`h2`)
            title.className = "card_title";
            title.textContent = products.title;

            const priceBrandContainer = cE(`div`)
            priceBrandContainer.className = "card_price_brand";

            const brand = cE(`p`)
            brand.className = "card_brand";
            brand.textContent = products.brand;

            const priceContainer = cE(`div`)
            priceContainer.className = "card_price_container";

            const price = cE(`p`)
            price.className = "card_price";
            price.textContent = "€ " + products.price;

            const qntyContainer = cE(`p`)
            qntyContainer.className = "card_qnty_container";

            // DECREMENTO QUANTITA' E CARRELLO ID DUPLICATI
            const minusBtn = cE(`button`)
            minusBtn.className = "minus_btn";
            minusBtn.textContent = "-"
            minusBtn.onclick = () => {
                let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
                const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";
                const parsedQuant = parseInt(cartQuantStorage)

                //DECREMENTO CARRELLO LOCAL STORAGE
                let cartControl = cartStorage.some(element => element.id === products.id && element.qnty > 1);
                if (cartControl) {
                    cartStorage = cartStorage.map(element => {
                        if (element.id === products.id) {
                            element.qnty = element.qnty - 1;
                        }
                        return element
                    })
                }
                else {
                    cartStorage = cartStorage.filter((productElim) => productElim.id != products.id)
                }
                const quantityToDecrement = cartStorage.find((el) => el.id === products.id);
                if (quantityToDecrement) {
                    qnty.textContent = quantityToDecrement.qnty
                } else {
                    defaultCartContainer.remove()
                }
                if (cartTotal) cartTotal.textContent = `Prezzo totale: ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`
                localStorage.setItem("cart", JSON.stringify(cartStorage))

                //DECREMENTO QUANTITA' LOCAL STORAGE
                if (parsedQuant > 0) {
                    localStorage.setItem("cart_quantity", parsedQuant - 1)
                    cartQuant.textContent = parsedQuant - 1
                    if (parsedQuant == 1) {
                        defaultCartContainer.remove()
                        location.reload()
                    }
                }
            }

            const qnty = cE(`p`)
            qnty.className = "card_qnty";
            qnty.textContent = products.qnty;

            // INCREMENTO QUANTITA' ID DUPLICATI
            const plusBtn = cE(`button`)
            plusBtn.className = "plus_btn";
            plusBtn.textContent = "+"
            plusBtn.onclick = () => {
                let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
                const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";
                const parsedQuant = parseInt(cartQuantStorage)

                //INCREMENTO CARRELLO LOCAL STORAGE
                let cartControl = cartStorage.some(element => element.id === products.id && element.qnty > 1);
                if (cartControl) {
                    cartStorage = cartStorage.map(element => {
                        if (element.id === products.id) {
                            element.qnty = element.qnty + 1;
                        }
                        return element
                    })
                }
                else {
                    cartStorage = cartStorage.filter((productElim) => productElim.id != products.id)
                }
                const quantityToDecrement = cartStorage.find((el) => el.id === products.id);
                if (quantityToDecrement) {
                    qnty.textContent = quantityToDecrement.qnty
                } else {
                    defaultCartContainer.remove()
                }
                if (cartTotal) cartTotal.textContent = `Prezzo totale: ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`

                localStorage.setItem("cart", JSON.stringify(cartStorage))

                //INCREMENTO QUANTITA' LOCAL STORAGE
                if (parsedQuant > 0) {
                    localStorage.setItem("cart_quantity", parsedQuant + 1)
                    cartQuant.textContent = parsedQuant + 1
                    if (parsedQuant == 1) {
                        defaultCartContainer.remove()
                        location.reload()
                    }
                }
            }

            priceContainer.append(price)
            qntyContainer.append(minusBtn, qnty, plusBtn)
            priceBrandContainer.append(brand, priceContainer);
            defaultCartContainer.append(img, title, priceBrandContainer, qntyContainer);
            if (cartContainer) cartContainer.append(defaultCartContainer);
        })
    }

    // INCREMENTO TOTALE CARRELLO
    if (cartTotal) cartTotal.textContent = `Prezzo totale: ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`

    // ACCESSO ALLA PAGINA DEL CARRELLO
    cartBtn.onclick = () => {
        if (loginControl == "true") location.assign("cart.html");
        else {
            const modal = qS("#modal");
            modal.openedBy = "cart";
            modal.style.display = "flex";
        }
    }

    // INCREMENTO NUMERO ARTICOLI
    if (loginControl === "true") {
        cartQuant.textContent = cartQuantStorage
    }
}
export default cart
