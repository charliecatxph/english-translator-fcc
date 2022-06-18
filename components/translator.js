const AmericanToBritish = require("./sub-components/american-to-british");
const BritishToAmerican = require("./sub-components/british-to-american");
const translate_am_br = new AmericanToBritish();
const translate_br_am = new BritishToAmerican();

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

const british = [
    Object.entries(americanOnly).map(d => d[1]),
    Object.entries(americanToBritishSpelling).map(d => d[1]),
    Object.entries(britishOnly).map(d => d[0])
];

const american = [
    Object.entries(americanOnly).map(d => d[0]),
    Object.entries(americanToBritishSpelling).map(d => d[0]),
    Object.entries(britishOnly).map(d => d[1])
];

const british_title = Object.entries(americanToBritishTitles).map(d => d[1]);
const american_title = Object.entries(americanToBritishTitles).map(d => d[0]).map(e => e.replace(".", "\\."));


class Translator {
    british_to_american(sentence) {
        return translate_br_am.translate(sentence, american, british, american_title, british_title);
    }
    american_to_british(sentence) {
        return translate_am_br.translate(sentence, american, british, american_title, british_title);   
    }
}

module.exports = Translator;