import React, {useEffect, useState} from "react";
import logo from '../../scss/img/logo-black.svg'
import DocumentResult from "../../components/DocumentResult";
import Button from "../../components/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {useDispatch} from "react-redux";
import {createDocData} from "../../store/actions/actionCreator";


const Results = ({newTexts, keyWords, percent, files, settings}) => {

    const dispatch = useDispatch();

    const [showText, setShowText] = useState(false);

    const sendDocData = (value) => dispatch(createDocData(value))

    const date = new Date();

    const createDate = (func) => {
        if(func < 10) {
            return '0' + func;
        } else {
            return func
        }
    };

    useEffect(() => {
        sendDocData({
            percent,
            files,
            date: `${createDate(date.getDate())}.${createDate(date.getMonth())}.${date.getFullYear()} ${createDate(date.getHours())}:${createDate(date.getMinutes())}:${createDate(date.getSeconds())} EEST`
        })
        const newHistory = (JSON.parse(localStorage.getItem('history'))).slice();
        if(percent >= 0){
            if(newHistory.length !==0){
                if(newHistory[newHistory.length-1].percent !== percent){
                    newHistory.push({
                        percent,
                        files,
                        date: `${createDate(date.getDate())}.${createDate(date.getMonth())}.${date.getFullYear()} ${createDate(date.getHours())}:${createDate(date.getMinutes())}:${createDate(date.getSeconds())} EEST`
                    });
                    localStorage.setItem('history',JSON.stringify(newHistory));
                }
            } else {
                newHistory.push({
                    percent,
                    files,
                    date: `${createDate(date.getDate())}.${createDate(date.getMonth())}.${date.getFullYear()} ${createDate(date.getHours())}:${createDate(date.getMinutes())}:${createDate(date.getSeconds())} EEST`
                });
                localStorage.setItem('history',JSON.stringify(newHistory));
            }
        }
    });



    const generatePDF = () => {
        html2canvas(document.querySelector('#results-box')).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF();
            doc.addImage(imgData, 'PNG',0,20 ,220, 160);
            doc.save("some.pdf");
        });
    };

    return(
        <section className='results'>
            {!showText && <div id='results-box' className='results-box'>
                <div className='results__header'>
                    <img alt='logo' src={logo}/>
                    <div className='results__header__percents'>
                        <h2>{percent.toFixed(2)}% Схожість</h2>
                        <div className='results__header__percents-box'>
                            <div style={{width: `${percent}%`}} className='results__header__percents-value'> </div>
                        </div>
                    </div>
                </div>
                <div className='results__date'>
                    <p className='results__date__text'>Дата перевірки:<span className='results__date__value'>{createDate(date.getDate())}.{createDate(date.getMonth())}.{date.getFullYear()} {createDate(date.getHours())}:{createDate(date.getMinutes())}:{createDate(date.getSeconds())} EEST</span></p>
                </div>
                <div className='results__main'>
                    {files.map((elem, index) => {
                        return(
                            <DocumentResult
                                key={index}
                                keyWords={keyWords[index]}
                                settings={settings}
                                first={index === 0}
                                {...elem}
                            />
                        );
                    })}
                </div>
            </div>}
            {showText && <div className='results__show-text'>
                <div className='results__show-text__main'>
                    <h2>Документ #1</h2>
                    <div className='results__show-text__main__text-value'>{newTexts[0]}</div>
                    <h2>Документ #2</h2>
                    <div className='results__show-text__main__text-value'>{newTexts[1]}</div>
                </div>
                <Button onClick={() => setShowText(false)} className='about__first-box__button results__show-text__btn'>Повернутися назад</Button>
            </div>}
            {!showText &&
            <div style={{justifyContent: !settings.checkingOnComp && 'center'}} className='results__buttons-box'>
                {settings.checkingOnComp && <Button onClick={() => setShowText(true)} className='about__first-box__button results__buttons-box__btn'>Переглянути стиснені тексти</Button>}
                <Button onClick={generatePDF} className='about__first-box__button results__buttons-box__btn'>Завантажити звіт у PDF</Button>
            </div>}
        </section>
    );
};


export default Results;