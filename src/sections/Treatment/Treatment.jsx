import React, {useState} from "react";
import Loading from "../../components/Loading";
import analyzeTexts from "../../js/analyzeTexts.js";
import checkForPlagiarism from "../../js/checkForPlagiarism.js";


const Treatment = ({files,settings}) => {
    const [loadingState, setLoadingState] = useState(true); //После конца обработки setLoadingState(false)
    const [treatmentCounter, setTreatmentCounter] = useState(0);//После начала вызвать setTreatmentCounter(1) и поставить предохранитель от повторных обработок данных при ререндеринге

    let summary_1, summary_2, keywords_1, keywords_2;
    if (treatmentCounter !== 1) {
        setTreatmentCounter(1);
        [[summary_1, summary_2], [keywords_1, keywords_2]] = analyzeTexts(files, settings);
        checkForPlagiarism(files, summary_1, summary_2, settings);
        setLoadingState(false);
    }

    return(
        <section className='treatment'>
            {loadingState && <Loading />}
            <h2 className='treatment__text'>Триває обробка ваших документів. Будь ласка, зачекайте декілька секунд</h2>
        </section>
    );
};


export default Treatment;