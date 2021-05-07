import React, {useState} from "react";
import Loading from "../../components/Loading";


const Treatment = ({files,settings}) => {
    console.log(files);
    console.log(settings);
    const [loadingState, setLoadingState] = useState(true); //После конца обработки setLoadingState(false)
    const [treatmentCounter, setTreatmentCounter] = useState(0);//После начала вызвать setTreatmentCounter(1) и поставить предохранитель от повторных обработок данных при ререндеринге

    return(
        <section className='treatment'>
            {loadingState && <Loading />}
            <h2 className='treatment__text'>Триває обробка ваших документів. Будь ласка, зачекайте декілька секунд</h2>
        </section>
    );
};


export default Treatment;