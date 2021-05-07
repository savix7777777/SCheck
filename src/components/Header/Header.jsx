import React from "react";
import {NavLink} from "react-router-dom";
import logo from '../../scss/img/logo.svg'


const Header = () => {

    return(
        <header>
                <div className='header__content'>
                    <NavLink to={'/main'}>
                        <img alt='logo' src={logo}/>
                    </NavLink>
                    <NavLink activeStyle={{borderBottom: '1px solid #FE66B8'}} exact to={'/main'}>Головна</NavLink>
                    <NavLink activeStyle={{borderBottom: '1px solid #FE66B8'}} exact to={'/'}><p>Про сервіс</p></NavLink>
                </div>
        </header>
    );
}


export default Header;