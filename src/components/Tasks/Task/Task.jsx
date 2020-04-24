import React from 'react';

import editImg from '../../../assets/img/edit.png';
import './Task.scss';

const Task = ({ text, id, completed }) => {
    return (
        <div className="task">
            <input id={`do-${text}-${id}`} type="checkbox" className="task__check" readOnly />
            <label htmlFor={`do-${text}-${id}`} className="task__custom-check"></label>
            <p className="task__text">{text}</p>
            <div className="task__controls">
                <img src={editImg} className="task__edit" alt="Edit task"/>
                <div className="task__delete"></div>
            </div>
        </div>
    );
}

export default Task;