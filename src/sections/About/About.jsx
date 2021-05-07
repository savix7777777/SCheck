import React from "react";
import Button from "../../components/Button";
import bubbles from '../../scss/img/bubbles.png'
import {useHistory} from "react-router";
import about1 from '../../scss/img/about-1.png';
import about2 from '../../scss/img/about-2.png';
import about3 from '../../scss/img/about-3.png';
import about4 from '../../scss/img/about-4.png';
import arrow1 from '../../scss/img/arrow-1.png';
import arrow2 from '../../scss/img/arrow-2.png';
import arrow3 from '../../scss/img/arrow-3.png';



const About = () => {

    const history = useHistory();

    return(
        <section className='about'>
            <div className='about__first-box'>
                <div className='about__first-box__content'>
                    <h1 className='about__first-box__h1'>
                        Інформаційна система<br />
                        з визначення близькості документів
                        на основі стиснення текстів
                    </h1>
                    <p className='about__first-box__p'>Задача сервісу полягає у використанні алгоритмів стиснення для подальшого порівняння завантажених користувачем текстових документів, формуванні звіту виявлення плагіату з можливістю його збереження.</p>
                    <div className='about__first-box__button-box'>
                        <Button className='about__first-box__button' onClick={() => history.push('/main')}>Завантажити документ</Button>
                    </div>
                </div>
                <img className='about__first-box__bubbles' alt='...' src={bubbles}/>
            </div>
            <div className='about__second-box'>
                <div className='about__second-box__content-right'>
                    <p>1. Завантажте документи або введіть текст власноруч</p>
                    <img className='about__second-box__about-1' alt='about-1' src={about1}/>
                </div>
                <img className='about__second-box__arrow-1' alt='arrow-1' src={arrow1}/>
                <div className='about__second-box__content-left'>
                    <p>2. Виконайте налаштування та натисніть “Продовжити”</p>
                    <img className='about__second-box__about-2' alt='about-2' src={about2}/>
                </div>
                <img className='about__second-box__arrow-2' alt='arrow-2' src={arrow2}/>
                <div className='about__second-box__content-right'>
                    <p>3. Очікуйте обробку Ваших файлів</p>
                    <img className='about__second-box__about-3' alt='about-3' src={about3}/>
                </div>
                <img className='about__second-box__arrow-3' alt='arrow-3' src={arrow3}/>
                <div className='about__second-box__content-left'>
                    <p style={{marginTop: '15%'}}>4. Готово! Збережіть отриманий звіт</p>
                    <img className='about__second-box__about-4' alt='about-4' src={about4}/>
                </div>
            </div>
        </section>
    );
};


export default About;