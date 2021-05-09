import findParagraphs, {makeTokens} from "./tokenize";
import getUniqueTokens, {concatSentences} from "./base";


export default function validateFiles(data, settings) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(checkFile(data[i].value, settings));
    }
    return result;
}

function checkFile(data, settings) {
    let paragraphs = findParagraphs(data);
    makeTokens(paragraphs);
    let sentences = concatSentences(paragraphs);
    let resultCompSize = true;
    if (settings.checkingOnComp && settings.compSize > sentences.length) {
        resultCompSize = false;
    }

    let uniqueTokens = getUniqueTokens(paragraphs);
    let resultKeyWordsCounter = true;
    if (settings.showKeyWords && settings.keyWordsCounter > uniqueTokens.length) {
        resultKeyWordsCounter = false;
    }

    return {
        "resultCompSize": resultCompSize,
        "resultKeyWordsCounter": resultKeyWordsCounter,
        "paragraphs": paragraphs,
        "uniqueTokens": uniqueTokens};
}

