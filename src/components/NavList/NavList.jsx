import React from 'react';
import "./NavList.scss";
import Dot from '../Dot/Dot';

const NavList = ({ tasks }) => {
    return (
    <ul className="nav-list">
        {
            tasks.map(task => (
                <li key={task.id} className={task.active ? 'nav-list__item nav-list__item_active' : 'nav-list__item'}>
                    {task.icon ? <i><img src={task.icon} alt={task.text + ' icon'} className="nav-list__item-image" /></i> : <i><Dot color={task.color}/></i>}
                    <span className="nav-list__item-text">{task.text}</span>
                </li>
            ))
        }
    </ul>
    );
}

export default NavList;