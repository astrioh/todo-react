import React from 'react';
import Dot from '../Dot/Dot';
import axios from 'axios';

import './NavList.scss';

const NavList = ({ items, deletable, onClick, onDelete, onItemClick, activeItem }) => {
    const deleteTheme = (theme) => {
        if (window.confirm(`Really delete '${theme.text}'?`)) {
            axios
                .delete(`http://localhost:3005/themes/${theme.id}`)
                .then(() => {
                    onDelete(theme.id);
                });
        }
    };

    return (
        <ul onClick={onClick} className="nav-list">
            {items.map((item) => (
                <li
                    key={item.id}
                    className={((activeItem && item.id === activeItem.id) || item.active) ? "nav-list__item nav-list__item_active" : "nav-list__item"}
                    onClick={onItemClick ? () => onItemClick(item) : null}
                >
                    {item.icon ? (
                        <i><img
                                src={item.icon}
                                alt={item.text + ' icon'}
                                className="nav-list__item-image"
                            /></i>
                    ) : (
                        <i><Dot color={item.color.name} /></i>
                    )}
                    <span className="nav-list__item-text">{item.text}</span>
                    {item.tasks && item.tasks.length > 0 && activeItem && item.id !== activeItem.id && (
                        <span className="nav-list__item-count">
                            {item.tasks.length}
                        </span>
                    )}
                    {deletable && (
                        <div
                            onClick={() => deleteTheme(item)}
                            className="nav-list__delete-item"
                        ></div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavList;
