export default function checkForPlagiarism(files, summary_1, summary_2, settings) {
    if (settings.checkingOnComp === true && summary_1 !== "" && summary_2 !== "") {
        requestApi(summary_1, summary_2);
    } else {
        requestApi(files[0].value, files[1].value);
    }
}

function requestApi(text1, text2) {
    fetch("https://twinword-text-similarity-v1.p.rapidapi.com/similarity/", {
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-key": "8bb0afe117mshc54f59969fe5f2cp1c0c0ejsn99e506728a4a",
            "x-rapidapi-host": "twinword-text-similarity-v1.p.rapidapi.com"
        },
        "body": {
            "text1": text1,
            "text2": text2
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
}




