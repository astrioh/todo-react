import React from 'react';
import "./NavList.scss";
import Dot from '../Dot/Dot';

const NavList = ({ items, deletable, onClick }) => {
    return (
    <ul onClick={onClick} className="nav-list">
        {
            items.map(item => (
                <li key={item.id} className={item.active ? 'nav-list__item nav-list__item_active' : 'nav-list__item'}>
                    {item.icon ? <i><img src={item.icon} alt={item.text + ' icon'} className="nav-list__item-image" /></i> : <i><Dot color={item.color}/></i>}
                    <span className="nav-list__item-text">{item.text}</span>
                </li>
            ))
        }
    </ul>
    );
}

export default NavList;