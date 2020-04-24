import React from 'react';

import editImg from '../../../assets/img/edit.png';
import './Task.scss';

const Task = ({ text, id, completed, onEdit, onDelete, themeId, onComplete }) => {
    const onChangeCheckbox = (e) => {
        onComplete(themeId, id, e.target.checked);
    }

    return (
        <div className="task">
            <input id={`do-${text}-${id}`} type="checkbox" className="task__check" onChange={onChangeCheckbox} checked={completed} />
            <label htmlFor={`do-${text}-${id}`} className="task__custom-check"></label>
            <p className="task__text">{text}</p>
            <div className="task__controls">
                <img src={editImg} onClick={() => onEdit(themeId, id ,text)} className="task__edit" alt="Edit task"/>
                <div onClick={() => onDelete(themeId, id, text)} className="task__delete"></div>
            </div>
        </div>
    );
}

export default Task;