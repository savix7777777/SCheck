import stem from "./stem.js";
import {stop_words} from "../data/stopWords";

export default function findParagraphs(data) {
    let paragraphs = [];
    data = data.split("\n\r");
    for (let i = 0; i < data.length; i++) {
        while (data[i].charAt(0) === "\n") {
            data[i] = data[i].slice(1);
        }
        if (data[i] !== null) {
            paragraphs.push(findSentences(data[i]));
        }
    }
    findSpecialSentences(paragraphs);
    return paragraphs;
}

function findSentences(data) {
    data = data.match(/[^.!?\n\r]+[.!?]+/g);
    for (let i = 0; i < data.length; i++) {
        while (data[i].charAt(0) === " ") {
            data[i] = data[i].slice(1);
        }
        while (data[i].charAt(0) === "\r") {
            data[i] = data[i].slice(1);
        }
        while (data[i].charAt(0) === "\n") {
            data[i] = data[i].slice(1);
        }
        data[i] = makeSentence(data[i]);
    }
    return data;
}

export function makeTokens(paragraphs) {
    for (let i = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            let tokens = [];
            tokens = tokenize(paragraphs[i][j].value);
            tokens = removeStopWords(tokens, stop_words);
            extractTokens(tokens, paragraphs[i][j]);
        }
    }
    addTokenInfoAboutSentences(paragraphs);
}

function makeToken(name, stemmedName, isFirst) {
    return {
        name,
        stemmedName,
        isFirst,
        frequency: 0,
        inFirstLast: false,
        inQuestionExclamation: false
    };
}

function makeSentence(value) {
    return {
        value,
        isFirstLast: false,
        isQuestionExclamation: false,
        tokens: [],
        relevance: 0
    };
}

function extractTokens(tokens, sentence) {
    const capital = /[ЙЦУКЕНГШЩЗХЇҐФІВАПРОЛДЖЄЯЧСМИТЬБЮA-Z$]+[йцукенгшщзхїґфівапролджєячсмитьбюa-z]*/g
    let isFirst = false;

    for (let i = 0; i < tokens.length; i++) {
        i === 0 && !tokens[i].search(capital) ? isFirst = true : isFirst = false;
        tokens[i] = makeToken(tokens[i], stem(tokens[i]), isFirst);
        sentence.tokens.push(tokens[i]);
    }
}

function addTokenInfoAboutSentences(paragraphs) {
    for (let i = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            if (paragraphs[i][j].isFirstLast && paragraphs[i][j].isQuestionExclamation) {
                for (let k = 0; k < paragraphs[i][j].tokens.length; k++) {
                    paragraphs[i][j].tokens[k].inFirstLast = true;
                    paragraphs[i][j].tokens[k].inQuestionExclamation = true;
                }
            }

            if (paragraphs[i][j].isFirstLast) {
                for (let k = 0; k < paragraphs[i][j].tokens.length; k++) {
                    paragraphs[i][j].tokens[k].inFirstLast = true;
                }
            }

            if (paragraphs[i][j].isQuestionExclamation) {
                for (let k = 0; k < paragraphs[i][j].tokens.length; k++) {
                    paragraphs[i][j].tokens[k].inQuestionExclamation = true;
                }
            }
        }
    }
}

function tokenize(data) {
    return data.match(/[^,.;:!?—«»"()\s]+[^.,;:!?—«»"()\s]*/g);
}

function findSpecialSentences(paragraphs) {
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i][0].isFirstLast = true;
        paragraphs[i][paragraphs[i].length-1].isFirstLast = true;
        for (let j = 0; j < paragraphs[i].length; j++)
        {
            if (!paragraphs[i][j].value.search(/[^.!?\r\n]+[!?]+/g)) paragraphs[i][j].isQuestionExclamation = true;
        }
    }
}

function removeStopWords(dataArray, stopWords) {
    dataArray = dataArray.filter((el) => !stopWords.includes( el.toLowerCase() ));
    return dataArray;
}
