import React from 'react';

import './Task.scss';

const Task = ({ text }) => {

    return (
        <div className="task">
            <label className="task__custom-check"><input type="checkbox" className="task__check" /></label>
            <input type="textarea" value={text} className="task__text" />
        </div>
    );
}

export default Task;