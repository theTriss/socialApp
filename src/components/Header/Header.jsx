import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <p className={style.login}>
                {props.login ? <> {props.login} <button onClick={props.logOutThunkCreator}>LogOut</button> </> : 
                    <NavLink to='/login'>LogIn</NavLink>
                }
                {}
            </p>
            <img src="" alt="" />
        </header>
    )
}

export default Header;