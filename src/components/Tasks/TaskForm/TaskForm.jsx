import React, { useState } from 'react';
import plusImg from '../../../assets/img/plus.png';
import axios from 'axios';

import './TaskForm.scss';
import Button from '../../Button/Button';

const TaskForm = ({ theme, onAddTask }) => {
    const [isFormVisible, setFormVisibility] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisibility = () => {
        setFormVisibility(!isFormVisible);
        setTaskName('');
    };

    const addTask = () => {
        if (!taskName) {
            alert('Enter task name');
            return;
        }
        let newTask = {
            themeId: theme.id,
            text: taskName,
            completed: false 
        };
        setIsLoading(true);
        axios
            .post('http://localhost:3005/tasks', newTask).then(({ data }) => {
                onAddTask(theme.id, data);
                toggleFormVisibility();
                setIsLoading(false);
            })
            .catch((data) => {
                alert('Something went wrong when adding a task');
                throw new Error(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
        
    }

    return (
        <div className="task-form">
            {!isFormVisible ? (
                <div className="task-form__new" onClick={toggleFormVisibility}>
                    <img src={plusImg} alt="Create new task" />
                    <span>Create new task</span>
                </div>
            ) : (
                <div className="task-form__form">
                    <input
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        type="text"
                        className="textfield task-form__textfield"
                        placeholder="Enter your task name"
                    />
                    <div className="task-form__controls">
                        <div className="task-form__add">
                            <Button
                                disabled={isLoading}
                                type="add"
                                text={isLoading ? 'Adding task...' : 'Add task'}
                                onClick={addTask}
                            />
                        </div>
                        <div className="task-form__cancel">
                            <Button
                                type="cancel"
                                text="Cancel"
                                onClick={toggleFormVisibility}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskForm;
