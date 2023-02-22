import en_EN from '../localization/en_EN.json' assert {type: 'json'};
import it_IT from '../localization/it_IT.json' assert {type: 'json'};

const cE = (type) => document.createElement(type);
const qS = (element) => document.querySelector(element);

const lang = localStorage.getItem('language');

const localString = (nome, attributo) => {
    const classSelector = qS('.' + nome);
    if (!classSelector) return;
    if (attributo) classSelector[attributo] = lang === "en_EN" ? en_EN[nome] : it_IT[nome];
    else { classSelector.textContent = lang === "en_EN" ? en_EN[nome] : it_IT[nome]; }
}

// TRADUTTORE CATEGORIE

const catTranslator = (nome) => {
    if (lang === "en_EN") return nome
    switch (nome) {
        case "all": return "Tutte"
        case "laptops": return "Notebooks";
        case "fragrances": return "Profumi";
        case "groceries": return "Alimentari";
        case "furniture": return "Mobili";
        case "tops": return "Magliette";
        case "sunglasses": return "Occhiali";
        case "automotive": return "Auto";
        case "motorcycle": return "Moto";
        case "lighting": return "Illuminazione";
        default: return nome;
    }
}

export { cE, qS, localString, catTranslator };