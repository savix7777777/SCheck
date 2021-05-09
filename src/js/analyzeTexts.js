import validateFiles from "./validate_file";
import summarize from "./summarize";


export default function analyzeTexts(files, settings) {
    let summary_1 = "",
        keywords_1 = [],
        summary_2 = "",
        keywords_2 = [];
    if (settings.checkingOnComp || settings.showKeyWords) {
        let [result_1, result_2] = validateFiles(files, settings);

        if (result_1.resultCompSize && result_2.resultCompSize &&
            result_1.resultKeyWordsCounter && result_2.resultKeyWordsCounter) {
            [summary_1, keywords_1] = summarize(settings, result_1.paragraphs, result_1.uniqueTokens);
            [summary_2, keywords_2] = summarize(settings, result_2.paragraphs, result_2.uniqueTokens);
        }

    }
    return [[summary_1, summary_2], [keywords_1, keywords_2]];
}

