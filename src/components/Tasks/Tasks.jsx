import React from 'react';
import './Tasks.scss';

import editImg from '../../assets/img/edit.png';
import Task from './Task/Task';

const Tasks = () => {
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                Grocery
                <img src={editImg} alt="Edit theme name" className="tasks__edit-img"/>
            </h2>
            <ul className="tasks__items">
                <li className="tasks__item"><Task text="Chicken" /></li>
                <li className="tasks__item"><Task text="Chicken" /></li>
                <li className="tasks__item"><Task text="Chicken" /></li>
                <li className="tasks__item"><Task text="Chicken" /></li>
            </ul>
        </div>
    );
}

export default Tasks;