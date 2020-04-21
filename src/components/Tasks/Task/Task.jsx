import React from 'react';

import './Task.scss';

const Task = ({ text }) => {
    let id = `do-${text}` + Math.floor(Math.random() * 100);
    return (
        <div className="task">
            <input id={id} type="checkbox" className="task__check" />
            <label htmlFor={id} className="task__custom-check"></label>
            <input type="textarea" value={text} className="task__text" />
        </div>
    );
}

export default Task;