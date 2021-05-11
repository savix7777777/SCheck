import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import logo from '../../scss/img/logo.svg'
import History from "../History";


const Header = () => {

    const [historyState, setHistoryState] = useState(false);

    return(
        <header>
            <div className='header__content'>
                <NavLink to={'/main'}>
                    <img alt='logo' src={logo}/>
                </NavLink>
                <NavLink activeStyle={{borderBottom: '1px solid #FE66B8'}} exact to={'/main'}>Головна</NavLink>
                <NavLink activeStyle={{borderBottom: '1px solid #FE66B8'}} exact to={'/'}><p>Про сервіс</p></NavLink>
            </div>
            <p className='header__history-switcher' onClick={() => setHistoryState(!historyState)}>Історія запитів <i style={{transform: !historyState && 'rotate(180deg)'}} className="fas fa-chevron-up"></i></p>
            {historyState && <History historyState={historyState} />}
        </header>
    );
}


export default Header;