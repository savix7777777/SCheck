import {concatTokens} from "./base";
import { frequencies } from '../data/ua_freq.js';

export default function calcTF_IDF(paragraphs, tokens) {
    const properNames = findProperNames(tokens);
    let [sentenceQuantity, questExclQuantity, firstLastQuantity] = calcQuantitySentences(paragraphs);

    tokens = concatTokens(paragraphs);

    for (let i = 0; i < tokens.length; i++) {
        let quantity = 0;
        for (let j = 0; j < tokens.length; j++) {
            if (tokens[i].stemmedName === tokens[j].stemmedName) {
                quantity++;
            }
        }
        calcByTFIDF(tokens[i], quantity, tokens.length);

        if (paragraphs.length >= 3 && sentenceQuantity >= 10) {
            calcBySpecialSentences(tokens[i], sentenceQuantity, questExclQuantity, firstLastQuantity);
        }

        if (tokens[i].name === properNames) {
            calcByProperName(tokens[i]);
        }
    }
}

function calcQuantitySentences(paragraphs) {
    let sentenceQuantity = 0;
    let questExclQuantity = 0;
    let firstLastQuantity = 0;
    for (let i = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            if (paragraphs[i][j].isQuestionExclamation) {
                questExclQuantity += 1;
            }
            if (paragraphs[i][j].isFirstLast) {
                firstLastQuantity += 1;
            }
            sentenceQuantity += 1;
        }
    }
    return [sentenceQuantity, questExclQuantity, firstLastQuantity];
}

function calcBySpecialSentences(token, sentenceQuantity, questExclQuantity, firstLastQuantity) {
    if (token.inQuestionExclamation) {
        token.frequency *= sentenceQuantity/questExclQuantity;
    }
    if (token.inFirstLast) {
        token.frequency *= sentenceQuantity/firstLastQuantity;
    }
}

function calcByTFIDF(token, quantity, tokenLength){
    // TF in TF-IDF

    token.frequency = quantity/tokenLength;
    // IDF in TF-IDF
    let dict_freq = findInJSON(token.stemmedName);
    //let dict_freq = findInJSON(freqDict, token.stemmedName);

    if (dict_freq !== 0) {
        token.frequency *= Math.log10(dict_freq);
    }
}

function findInJSON(tokenStemmedName) {
    const freqDict = frequencies;
    for (let i = 0; i < freqDict.length; i++){
        if (freqDict[i].stemmedWord === tokenStemmedName){
            return freqDict[i].rel_freq;
        }
    }
    return 0;
}

function calcByProperName(token) {
    token.frequency *= Math.log10(15);
}


function findProperNames(tokens) {
    const capital = /[ЙЦУКЕНГШЩЗХЇҐФІВАПРОЛДЖЄЯЧСМИТЬБЮA-Z$]+[йцукенгшщзхїґфівапролджєячсмитьбюa-z]*/g
    let properNames = [];
    for (let i = 0; i < tokens.length; i++) {
        if (i !== 0 && !tokens[i].name.search(capital) && tokens[i].isFirst === false) {
            properNames.push(tokens[i]);
        }
    }
    return properNames;
}
