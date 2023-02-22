import { cE, qS } from "./utils.js"

const lang = () => {

    const language = localStorage.getItem("language")
    if (!language) { localStorage.setItem("language", navigator.language || navigator.userLanguage) }

    const btn = qS('#lang_btn')
    btn.style.backgroundImage = `url(${language === "it_IT" ? "../assets/img/icons/usa.png" : "../assets/img/icons/it.png"})`

    btn.onclick = () => {
        localStorage.setItem('language', language === "it_IT" ? "en_EN" : "it_IT")
        location.reload()
    }
}
export default lang