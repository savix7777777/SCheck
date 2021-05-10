import calcTF_IDF from "./tf_idf.js";
import {concatSentences} from "./base.js";

export default function summarize(settings, paragraphs, uniqueTokens) {
    let summary = "";
    let keywords = [];
    calcTF_IDF(paragraphs, uniqueTokens);
    evaluateSentences(paragraphs);
    if (settings.checkingOnComp === true) {
        summary = getSummary(concatSentences(paragraphs), settings.compSize);
    }
    if (settings.showKeyWords === true){
        keywords = sortKeyWords(uniqueTokens).slice(0, settings.keyWordsCounter);
        keywords = getKeywordValues(keywords);
    }
    return [summary, keywords];
}

function getKeywordValues(keywords) {
    let keywordsValues = [];
    for (let i = 0; i < keywords.length; i++) {
        keywordsValues.push(keywords[i].name);
    }
    return keywordsValues;
}

function getSummary(sentences, compSize) {
    sentences = getRelevantSentences(sentences, compSize);
    sentences = sortRelevantSentences(sentences);

    let summary = "";
    for (let i = 0; i < sentences.length; i++) {
        summary += sentences[i][2].value + " ";
    }
    return summary;
}

function getRelevantSentences(sentences, compSize) {
    let sentenceArray = [];
    let counter = 0;
    while (compSize > counter) {
        let highest = [0, 0, 0];
        for (let i = 0; i < sentences.length; i++) {
            if (sentences[i][2].relevance > highest[1]) {
                highest = [i , sentences[i][2].relevance, sentences[i]];
            }
        }
        sentenceArray.push(highest[2]);
        sentences.splice(highest[0], 1);
        counter++;
    }
    return sentenceArray;
}

function sortRelevantSentences(sentences) {
    return sentences.sort(function (x, y) {
        let n = x[0] - y[0];
        if (n !== 0) {
            return n;
        }
        return x[1] - y[1];
    });
}

function sortKeyWords(uniqueTokens) {
    return uniqueTokens.sort(function (x, y) {
        if ( x.frequency > y.frequency ){
            return -1;
        }
        if ( x.frequency < y.frequency ){
            return 1;
        }
        return 0;
    });
}

function evaluateSentences(paragraphs)  {
    for (let i = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            let mark_relevance = 0;
            for (let k = 0; k < paragraphs[i][j].tokens.length; k++) {
                 mark_relevance += paragraphs[i][j].tokens[k].frequency;
            }
            paragraphs[i][j].relevance = mark_relevance/paragraphs[i][j].tokens.length;
        }
    }
}








