import React from 'react';
import Dot from '../Dot/Dot';
import axios from 'axios';

import "./NavList.scss";


const NavList = ({ items, deletable, onClick, onDelete }) => {
    const deleteTheme = (theme) => {
        if (window.confirm(`Really delete '${theme.text}'?`)) {
            axios.delete(`http://localhost:3005/themes/${theme.id}`).then(() => {
                onDelete(theme.id);
            });
        }
    }

    return (
    <ul onClick={onClick} className="nav-list">
        {
            items.map(item => (
                <li key={item.id} className='nav-list__item'>
                    {item.icon ? <i><img src={item.icon} alt={item.text + ' icon'} className="nav-list__item-image" /></i> : <i><Dot color={item.color.name}/></i>}
                    <span className="nav-list__item-text">{item.text}</span>
                    {deletable && <div onClick={() => deleteTheme(item)} className="nav-list__delete-item"></div>}
                </li>
            ))
        }
    </ul>
    );
}

export default NavList;