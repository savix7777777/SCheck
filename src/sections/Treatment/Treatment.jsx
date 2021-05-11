import React, {useState} from "react";
import Loading from "../../components/Loading";
import analyzeTexts from "../../js/analyzeTexts.js";
import {detectPlagiarismDice} from "../../js/detectPlagiarism.js";
import {useHistory} from "react-router";


const Treatment = ({setNewTexts,setPercent,setKeyWords,files,settings}) => {

    const history = useHistory();

    const [loadingState, setLoadingState] = useState(true); //После конца обработки setLoadingState(false)
    const [treatmentCounter, setTreatmentCounter] = useState(0);//После начала вызвать setTreatmentCounter(1) и поставить предохранитель от повторных обработок данных при ререндеринге

    let summary_1, summary_2, keywords_1, keywords_2;
    if (treatmentCounter !== 1) {
        setTreatmentCounter(1);
        [[summary_1, summary_2], [keywords_1, keywords_2]] = analyzeTexts(files, settings);
        let resultPlagiarism = detectPlagiarismDice(files, summary_1, summary_2, settings);
        setPercent(resultPlagiarism * 100);
        setNewTexts([summary_1, summary_2]);
        setKeyWords([keywords_1, keywords_2]);
        history.push('/results');
    }

    return(
        <section className='treatment'>
            {loadingState && <Loading />}
            <h2 className='treatment__text'>Триває обробка ваших документів. Будь ласка, зачекайте декілька секунд</h2>
        </section>
    );
};


export default Treatment;