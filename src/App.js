import React, { useState } from 'react';
import NavList from './components/NavList/NavList';

import menuImg from './assets/img/menu.png';
import AddListBtn from './components/AddListBtn/AddListBtn';

import DB from './assets/db.json';

function App() {
    const [themes, setThemes] = useState(
        DB.themes.map((theme) => {
            theme.color = DB.colors.find(
                (color) => color.id === theme.colorId
            ).name;
            return theme;
        })
    );

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
                <div className='todo-app__themes'><NavList items={themes} deletable /></div>
                <AddListBtn themeLastId={themes.length} onAddTheme={onAddTheme} colors={DB.colors} />
            </div>
            <div className="todo-app__tasks">aaaa</div>
        </div>
    );
}

export default App;
