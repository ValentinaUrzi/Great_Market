import { cE, qS } from "./utils.js";

const cart = () => {

    const loginControl = localStorage.getItem("isLogged");
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";
    const lang = localStorage.getItem("language")

    const cartQuant = qS(".quantity");
    const cartBtn = qS(".cart_container");
    const cartContainer = qS(".cart_page");
    const cartTotal = qS(".total");
    const checkoutBtn = qS(".checkout_btn");

    const url = location.href

    const emptyCartMessage = cE("h2");
    emptyCartMessage.className = "empty_cart_mess";
    emptyCartMessage.textContent = "Your cart is empty";

    // SE NON SONO LOGGATO REDIRECT
    if (url.includes("cart")) loginControl !== "true" && location.replace("/")

    // SE NON CI SOPNO PRODOTTI MOSTRO MESSAGGIO CARRELLO VUOTO
    if (parseInt(cartQuantStorage) === 0) {
        if (checkoutBtn) checkoutBtn.style.display = "none";
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

            const imgTitleWrapper = cE("div")
            imgTitleWrapper.className = "img_title_wrapper";

            const img = cE(`img`)
            img.className = "cart_card_image";
            img.src = products.image

            const titleBrandWrapper = cE("div")
            titleBrandWrapper.className = "title_brand_wrapper";

            const title = cE(`h2`)
            title.className = "cart_title";
            title.textContent = products.title;

            const brandCatContainer = cE("div")
            brandCatContainer.className = "brand_cat_container";

            const brand = cE(`p`)
            brand.className = "cart_brand";
            brand.textContent = `${products.brand} -`;

            const category = cE(`p`)
            category.className = "cart_category";
            category.textContent = products.category;

            const priceQuantContainer = cE(`div`)
            priceQuantContainer.className = "cart_price_brand";

            const priceContainer = cE(`div`)
            priceContainer.className = "cart_price_container";

            const price = cE(`p`)
            price.className = "cart_price";
            price.textContent = "€ " + products.price;

            const qntyContainer = cE(`p`)
            qntyContainer.className = "cart_qnty_container";

            const minusBtn = cE(`button`)
            minusBtn.className = "minus_btn";
            minusBtn.textContent = "-"
            minusBtn.onclick = () => {
                let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
                const cartQuantStorage = localStorage.getItem("cart_quantity") || "0";
                const parsedQuant = parseInt(cartQuantStorage)

                //DECREMENTO QUANTITA' PRODOTTO LOCAL STORAGE (CART)
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
                if (cartTotal) cartTotal.textContent = lang === "it_IT" ? `Prezzo totale : ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`
                    : `Total Price : ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`
                localStorage.setItem("cart", JSON.stringify(cartStorage))

                //DECREMENTO QUANTITA' LOCAL STORAGE (CART_QUANTITY)
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
                let cartControl = cartStorage.some(element => element.id === products.id && element.qnty > 0);
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
                if (cartTotal) cartTotal.textContent = lang === "it_IT" ? `Prezzo totale : ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`
                    : `Total Price : ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`

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
            priceQuantContainer.append(priceContainer, qntyContainer);
            imgTitleWrapper.append(img, titleBrandWrapper)
            brandCatContainer.append(brand, category)
            titleBrandWrapper.append(title, brandCatContainer)
            defaultCartContainer.append(imgTitleWrapper, priceQuantContainer);
            if (cartContainer) cartContainer.append(defaultCartContainer);
        })
    }

    // ACCESSO ALLA PAGINA DEL CARRELLO
    cartBtn.onclick = () => {
        if (loginControl == "true") location.assign("cart.html");
        else {
            const modal = qS("#modal");
            modal.openedBy = "cart";
            modal.style.display = "flex";
        }
    }
    // SETTO LA LINGUA ALL'ATTERRAGGIO
    if (cartTotal) cartTotal.textContent = lang === "it_IT" ? `Prezzo totale : ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`
        : `Total Price : ${cartStorage.reduce((total, value) => total + (value.price * value.qnty), 0)}€`

    // INCREMENTO NUMERO ARTICOLI
    if (loginControl === "true") {
        cartQuant.textContent = cartQuantStorage
    }

    // PROCEDERE AL PAGAMENTO DEL CARRELLO
    if (checkoutBtn) checkoutBtn.onclick = () => {
        location.assign("checkout.html")
    }
}
export default cart
