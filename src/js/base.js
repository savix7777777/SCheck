export default function getUniqueTokens(paragraphs) {
    let allTokens = concatTokens(paragraphs);
    allTokens = deleteDuplicates(allTokens);
    return allTokens;
}

export function concatTokens(paragraphs) {
    let allTokens = [];
    for (let i = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            for (let k = 0; k < paragraphs[i][j].tokens.length; k++){
                allTokens = allTokens.concat(paragraphs[i][j].tokens[k]);
            }
        }
    }
    return allTokens;
}

export function concatSentences(paragraphs) {
    let sentences = [];
    for (let i = 0; i < paragraphs.length; i++) {
        for (let j = 0; j < paragraphs[i].length; j++) {
            sentences.push([i, j, paragraphs[i][j]]);
        }
    }
    return sentences;
}

function deleteDuplicates(tokens) {
    let seen = {};
    let out = [];
    let len = tokens.length;

    let j = 0;
    for(let i = 0; i < len; i++) {
        let item = tokens[i];
        if(seen[item.stemmedName] !== 1) {
            seen[item.stemmedName] = 1;
            out[j++] = item;
        }
    }
    return out;
}

