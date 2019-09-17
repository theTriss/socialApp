import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './Aside.css';

const Aside= (props) => {
    return (    
        <aside>
            <nav>
                <menu>
                    <li><NavLink to="/profile" activeClassName='activeLink'>profile</NavLink></li>
                    <li><NavLink to="/dialogs" activeClassName='activeLink'>messages</NavLink></li>
                    <li><NavLink to="/users" activeClassName='activeLink'>users</NavLink></li>
                    <li><NavLink to='/news' activeClassName='activeLink'>news</NavLink></li>
                    <li><NavLink to='/music' activeClassName='activeLink'>music</NavLink></li>
                    <li><NavLink to="/settings" activeClassName='activeLink'>settings</NavLink></li>
                </menu>
            </nav>
        </aside>
    )
}


export default Aside;