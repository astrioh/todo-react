import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavList from './components/NavList/NavList';
import AddListBtn from './components/AddListBtn/AddListBtn';
import Tasks from './components/Tasks/Tasks';

import menuImg from './assets/img/menu.png';

function App() {
    const [themes, setThemes] = useState(null);
    const [colors, setColors] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:3005/themes?_expand=color')
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
                            }}
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
                <Tasks theme={themes[0]} />
            </div>
        </div>
    );
}

export default App;
