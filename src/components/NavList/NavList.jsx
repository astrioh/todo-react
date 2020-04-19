import React from 'react';
import "./NavList.scss";
import Dot from '../Dot/Dot';

const NavList = ({ items, deletable, onClick, onDelete }) => {
    const deleteTheme = (theme) => {
        if (window.confirm(`Really delete '${theme.text}'?`)) {
            onDelete(theme);
        }
    }

    return (
    <ul onClick={onClick} className="nav-list">
        {
            items.map(item => (
                <li key={item.id} className={item.active ? 'nav-list__item nav-list__item_active' : 'nav-list__item'}>
                    {item.icon ? <i><img src={item.icon} alt={item.text + ' icon'} className="nav-list__item-image" /></i> : <i><Dot color={item.color}/></i>}
                    <span className="nav-list__item-text">{item.text}</span>
                    {deletable && <div onClick={() => deleteTheme(item)} className="nav-list__delete-item"></div>}
                </li>
            ))
        }
    </ul>
    );
}

export default NavList;