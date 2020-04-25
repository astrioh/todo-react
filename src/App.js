import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';

import NavList from './components/NavList/NavList';
import AddListBtn from './components/AddListBtn/AddListBtn';
import Tasks from './components/Tasks/Tasks';

import menuImg from './assets/img/menu.png';

function App() {
    const [themes, setThemes] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    let history = useHistory();

    useEffect(() => {
        axios
            .get('http://localhost:3005/themes?_expand=color&_embed=tasks')
            .then(({ data }) => {
                setThemes(data);
            });
        axios.get('http://localhost:3005/colors').then(({ data }) => {
            setColors(data);
        });
    }, []);

    // Getting active item when clicking it in the NavList
    useEffect(() => {
        const activeId = history.location.pathname.split('themes/')[1];
        const activeItemObj =
            themes && themes.find((theme) => theme.id === +activeId);
        setActiveItem(activeItemObj);
    }, [history.location.pathname, themes]);

    const onAddTheme = (themeObj) => {
        setThemes([...themes, themeObj]);
    };

    const onAddTask = (themeId, taskObj) => {
        const newThemes = themes.map((theme) => {
            if (theme.id === themeId) {
                theme.tasks = [...theme.tasks, taskObj];
            }
            return theme;
        });
        setThemes(newThemes);
    };

    const onDeleteTask = (themeId, taskId, taskName) => {
        if (window.confirm(`Do you really want to delete '${taskName}'?`)) {
            const newThemes = themes.map((theme) => {
                if (theme.id === themeId) {
                    theme.tasks = theme.tasks.filter(
                        (task) => task.id !== taskId
                    );
                }
                return theme;
            });
            setThemes(newThemes);
            axios
                .delete(`http://localhost:3005/tasks/${taskId}`)
                .catch(() => alert('Something went wrong removing the task'));
        }
    };

    const onEditTask = (themeId, taskId, taskName) => {
        const newTaskName = window.prompt('Enter new task name', taskName);
        if (!newTaskName) {
            alert('Please enter task name');
            return;
        }
        const newThemes = themes.map((theme) => {
            if (theme.id === themeId) {
                theme.tasks = theme.tasks.map((task) => {
                    if (task.id === taskId) {
                        task.text = newTaskName;
                    }
                    return task;
                });
            }
            return theme;
        });
        setThemes(newThemes);
        axios
            .patch(`http://localhost:3005/tasks/${taskId}`, {
                text: newTaskName,
            })
            .catch(() => {
                alert('Something went wrong editing the task');
            });
    };
    
    const onCompleteTask = (themeId, taskId, completed) => {
        const newThemes = themes.map((theme) => {
            if (theme.id === themeId) {
                theme.tasks = theme.tasks.map((task) => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return theme;
        });
        setThemes(newThemes);
        axios
            .patch(`http://localhost:3005/tasks/${taskId}`, {
                completed: completed,
            })
            .catch(() => {
                alert('Something went wrong completing the task');
            });
    }

    const onEditThemeTitle = (id, title) => {
        const newThemes = themes.map((theme) => {
            if (theme.id === id) {
                theme.text = title;
            }
            return theme;
        });
        setThemes(newThemes);
    };

    return (
        <div className="todo-app">
            <div className="todo-app__menu">
                <NavList
                    items={[
                        {
                            id: 1,
                            icon: menuImg,
                            text: 'All tasks',
                            active: history.location.pathname === '/',
                        },
                    ]}
                    onItemClick={() => history.push('/')}
                />
                <div className="todo-app__themes">
                    {themes ? (
                        <NavList
                            items={themes}
                            onDelete={(id) => {
                                const newThemes = themes.filter(
                                    (theme) => theme.id !== id
                                );
                                history.location.pathname = '/';
                                setThemes(newThemes);
                                setActiveItem(null);
                            }}
                            onItemClick={(item) =>
                                history.push(`/themes/${item.id}`)
                            }
                            activeItem={activeItem}
                            deletable
                        />
                    ) : (
                        'Loading...'
                    )}
                </div>
                <AddListBtn
                    themeLastId={Array.isArray(themes) ? themes.length : 0}
                    onAddTheme={onAddTheme}
                    colors={colors}
                />
            </div>
            <div className="todo-app__tasks">
                <Route exact path="/">
                    {themes &&
                        themes.map((theme) => (
                            <Tasks
                                key={theme.id}
                                theme={theme}
                                onAddTask={onAddTask}
                                onDeleteTask={onDeleteTask}
                                onEditTask={onEditTask}
                                onCompleteTask={onCompleteTask}
                                onTitleEdit={onEditThemeTitle}
                                withoutEmptyBody
                            />
                        ))}
                </Route>
                <Route path="/themes/:id">
                    {themes && activeItem && (
                        <Tasks
                            theme={activeItem}
                            onAddTask={onAddTask}
                            onTitleEdit={onEditThemeTitle}
                            onDeleteTask={onDeleteTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                        />
                    )}
                </Route>
            </div>
        </div>
    );
}

export default App;
