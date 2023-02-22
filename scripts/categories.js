import { catTranslator, cE, qS } from "./utils.js"


const exportCat = () => {

    const catContainerEl = qS(".categories")

    const catGen = async () => {
        const res = await fetch(`https://dummyjson.com/products/categories`)
        const data = await res.json();
        {
            data.forEach(data => {
                if (!(data.includes("-") || data.includes("smartphones"))) {
                    const catTabEl = cE("div");
                    catTabEl.className = "category"

                    const catTabElName = cE("h2")
                    catTabElName.className = ("cat_name");
                    catTabElName.textContent = catTranslator(data);

                    catTabEl.appendChild(catTabElName);
                    catContainerEl.appendChild(catTabEl);
                }
            })
        }
    }
    catGen()
}
export default exportCat;    