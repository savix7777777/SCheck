import React from "react";
import {useHistory, useLocation} from "react-router";


const NavigationDesk = ()=> {

    const location = useLocation();
    const history = useHistory();

    return(
        <div className='navigation-desk'>
            <div onClick={location.pathname === '/settings' ? () => {history.push('/main')} : () => {}} className='navigation-desk__first first' style={{backgroundColor: location.pathname !== '/main' && location.pathname !== '/settings' && '#E6E6E6', cursor: 'pointer'}}>1. Завантаження файлів</div>
            {location.pathname !== '/main' && <div style={{backgroundColor: location.pathname !== '/main' && location.pathname !== '/settings' && '#E6E6E6'}} className='navigation-desk__first navigation-desk__second'>2. Налаштування</div>}
            {location.pathname !== '/main' && location.pathname !== '/settings' && <div style={{backgroundColor: location.pathname !== '/main' && location.pathname !== '/settings' && location.pathname !== '/treatment' && '#E6E6E6'}} className='navigation-desk__first navigation-desk__second'>3. Обробка</div>}
            {location.pathname !== '/main' && location.pathname !== '/settings' && location.pathname !== '/treatment' && <div className='navigation-desk__first navigation-desk__second third'>4. Отримання результатів</div>}
        </div>
    );
};


export default NavigationDesk;