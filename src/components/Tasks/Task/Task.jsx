import React from 'react';

import './Task.scss';

const Task = ({ text, id, completed }) => {
    return (
        <div className="task">
            <input id={`do-${text}-${id}`} type="checkbox" className="task__check" readOnly />
            <label htmlFor={`do-${text}-${id}`} className="task__custom-check"></label>
            <input type="textarea" value={text} className="task__text" />
        </div>
    );
}

export default Task;