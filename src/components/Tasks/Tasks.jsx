import React from 'react';
import './Tasks.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

import editImg from '../../assets/img/edit.png';

import Task from './Task/Task';
import TaskForm from './TaskForm/TaskForm';

const Tasks = ({ theme, onTitleEdit, onAddTask, withoutEmptyBody, onDeleteTask, onEditTask, onCompleteTask }) => {
    const titleEdit = () => {
        const newTitle = prompt('Enter new title', theme.text);
        if (newTitle) {
            onTitleEdit(theme.id, newTitle);
            axios
                .patch(`http://localhost:3005/themes/${theme.id}`, {
                    text: newTitle,
                })
                .catch(() => alert("Couldn't update theme name!"));
        }
    };
    
    return (
        <div className="tasks">
            <Link to={`/themes/${theme.id}`}>
                <h2 className={`tasks__title tasks__title_${theme.color.name}`}>
                    <span>{theme.text}</span>
                    <img
                        src={editImg}
                        onClick={titleEdit}
                        alt="Edit theme name"
                        className="tasks__edit-img"
                    />
                </h2>
            </Link>
            <ul className="tasks__items">
                {!withoutEmptyBody && !theme.tasks.length && (
                    <h3 className="tasks__empty-title">There are no tasks</h3>
                )}
                {theme.tasks.map((task) => (
                    <li key={task.id} className="tasks__item">
                        <Task
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                            onComplete={onCompleteTask}
                            id={task.id}
                            themeId={theme.id}
                            text={task.text}
                            completed={task.completed}
                        />
                    </li>
                ))}
            </ul>
            <TaskForm key={theme.id} theme={theme} onAddTask={onAddTask} />
        </div>
    );
};

export default Tasks;
