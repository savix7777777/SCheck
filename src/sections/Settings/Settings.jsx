import React, {useState} from "react";
import Button from "../../components/Button";
import Switcher from "../../components/Switcher";
import {useHistory} from "react-router";


const Settings = ({setSettings}) => {

    const [compCounter, setCompCounter] = useState(7);
    const [showKeyWords,setShowKeyWords] = useState(false);
    const [keyWordsCounter,setKeyWordsCounter] = useState(10);
    const [checkingOnComp, setCheckingOnComp] = useState(false);
    const [showWordsCounter, setShowWordsCounter] = useState(false);
    const [showSignCounter, setShowSignCounter] = useState(false);

    const history = useHistory();

    const sendSettings = () => {
        setSettings({
            compSize: compCounter,
            showKeyWords,
            keyWordsCounter,
            checkingOnComp,
            showWordsCounter,
            showSignCounter,
        });
        history.push('/treatment'); // PUSH TREATMENT
    };


    return(
        <section className='settings'>
            <Button onClick={() => history.goBack()} className='settings__arr-right'><i className="fas fa-chevron-left"> </i></Button>
            <h2 className='settings__h2'>Налаштування стиснення тексту</h2>
            <div className='settings__first-box'>
                <p className='settings__first-box__text-size'>Розмір очікуваного стиснення</p>
                <div className='settings__first-box__counter'>
                    <Button className='settings__first-box__counter__button' onClick={() => compCounter !== 1 && setCompCounter(compCounter-1)}>-</Button>
                    <p className='settings__first-box__counter__text'>{compCounter}</p>
                    <Button className='settings__first-box__counter__button' onClick={() => setCompCounter(compCounter+1)}>+</Button>
                </div>
            </div>
            <h2 className='settings__h2'>Ключові слова</h2>
            <div className='settings__key-words'>
                <div className='settings__key-words-subBox'>
                    <p className='settings__key-words__text'>Вивести ключові слова</p>
                    <p className='settings__key-words__text'>Кількість ключових слів</p>
                </div>
                <div className='settings__key-words-subBox'>
                    <Switcher value={showKeyWords} getValue={setShowKeyWords} id={'1'} />
                    <div className='settings__first-box__counter' style={{marginLeft: 0}}>
                        <Button className='settings__first-box__counter__button' onClick={() => keyWordsCounter !== 1 && setKeyWordsCounter(keyWordsCounter-1)}>-</Button>
                        <p className='settings__first-box__counter__text'>{keyWordsCounter}</p>
                        <Button className='settings__first-box__counter__button' onClick={() => setKeyWordsCounter(keyWordsCounter+1)}>+</Button>
                    </div>
                </div>
            </div>
            <h2 className='settings__h2'>Налаштування перевірки документів на близькість</h2>
            <div className='settings__main' style={{height: '12em'}}>
                <div className='settings__key-words-subBox' style={{height: '6em'}}>
                    <p className='settings__key-words__text'>Перевірка на основі стиснення</p>
                    <p className='settings__key-words__text'>Вивести кількість слів </p>
                    <p className='settings__key-words__text'>Вивести кількість символів </p>
                </div>
                <div className='settings__key-words-subBox' style={{height: '6em'}}>
                    <Switcher value={checkingOnComp} getValue={setCheckingOnComp} id={'2'} />
                    <Switcher value={showWordsCounter} getValue={setShowWordsCounter} id={'3'} />
                    <Switcher value={showSignCounter} getValue={setShowSignCounter} id={'4'} />
                </div>
            </div>
            <Button onClick={sendSettings} className='about__first-box__button settings__confirm-button'>Продовжити</Button>
        </section>
    );
};


export default Settings;