import React from 'react';
import './Tasks.scss';

import editImg from '../../assets/img/edit.png';
import Task from './Task/Task';

const Tasks = ({theme}) => {
    console.log(theme);
    
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {theme.text}
                <img src={editImg} alt="Edit theme name" className="tasks__edit-img"/>
            </h2>
            <ul className="tasks__items">
                {theme.tasks.map((task) => (<li key={task.id} className="tasks__item"><Task id={task.id} text={task.text} completed={task.completed} /></li>))}
            </ul>
        </div>
    );
}

export default Tasks;