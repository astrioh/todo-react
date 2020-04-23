import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavList from './components/NavList/NavList';
import AddListBtn from './components/AddListBtn/AddListBtn';
import Tasks from './components/Tasks/Tasks';

import menuImg from './assets/img/menu.png';

function App() {
    const [themes, setThemes] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

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

    const onEditThemeTitle = (id, title) => {
        const newThemes = themes.map(theme => {
            if (theme.id === id) {
                theme.text = title;
            }
            return theme;
        });
        setThemes(newThemes);
    }

    return (
        <div className="todo-app">
            <div className="todo-app__menu">
                <NavList
                    items={[
                        {
                            id: 1,
                            icon: menuImg,
                            text: 'All tasks',
                            active: true,
                        },
                    ]}
                />
                <div className="todo-app__themes">
                    {themes ? (
                        <NavList
                            items={themes}
                            onDelete={(id) => {
                                const newThemes = themes.filter(
                                    (theme) => theme.id !== id
                                );
                                setThemes(newThemes);
                                setActiveItem(newThemes[themes.length - 2])
                            }}
                            onItemClick={item => setActiveItem(item)}
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
                {themes && activeItem && <Tasks theme={activeItem} onAddTask={onAddTask} onTitleEdit={onEditThemeTitle} />}
            </div>
        </div>
    );
}

export default App;
