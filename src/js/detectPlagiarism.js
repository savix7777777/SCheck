import findParagraphs, {makeTokens} from "./tokenize";
import {concatTokens} from "./base";
import crc32 from 'crc/crc32';
import stringSimilarity from "string-similarity";

export function detectPlagiarismDice(files, summary_1, summary_2, settings) {
    if (settings.checkingOnComp === true && summary_1 !== "" && summary_2 !== "") {
        return stringSimilarity.compareTwoStrings(summary_1, summary_2);
    } else {
        return stringSimilarity.compareTwoStrings(files[0].value, files[1].value);
    }
}

export function detectPlagiarismShingles(files, summary_1, summary_2, settings) {
    if (settings.checkingOnComp === true && summary_1 !== "" && summary_2 !== "") {
        return detect(summary_1, summary_2);
    } else {
        return detect(files[0].value, files[1].value);
    }
}

function detect(text_1, text_2) {
    [text_1, text_2] = [normalizeText(text_1), normalizeText(text_2)];
    let [shingles_1, shingles_2] = [createShingles(text_1, 3), createShingles(text_2, 3)];
    return compareShingles(hashShingles(shingles_1), hashShingles(shingles_2));
}

function normalizeText(text) {
    let paragraphs = findParagraphs(text);
    makeTokens(paragraphs);
    let textArray = concatTokens(paragraphs);
    let normalizedText = [];
    for (let i = 0; i < textArray.length; i++) {
        normalizedText.push(textArray[i].stemmedName);
    }
    return normalizedText;
}

function createShingles(text, shingleLength) {
    let shingles = [];
    let textLength = text.length;
    while(shingles.length !== (textLength - shingleLength + 1)) {
        shingles.push(text.slice(0, shingleLength).join(' '));
        text = text.slice(1);
    }
    return shingles;
}

function hashShingles(shingles) {
    let hashes = [];
    for(let i = 0, n = 1; i < n; i++) {
        let hashedArr = [];
        for(let j = 0, k = shingles.length; j < k; j++) {
            hashedArr.push(crc32(shingles[j]));
        }
        hashes.push(hashedArr);
    }
    return hashes;
}

function compareShingles(hashes_1, hashes_2) {
    let count = 0;
    hashes_1[0].forEach(function(item) {
        if(hashes_2[0].indexOf(item) !== -1) {
            count++;
        }
    });

    return count*2/(hashes_1[0].length + hashes_2[0].length)*100;
}