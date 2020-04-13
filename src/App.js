import React from 'react';
import NavList from './components/NavList/NavList';

import menuImg from './assets/img/menu.png';

function App() {
    return (
    <div className="todo-app">
        <div className="todo-app__menu">
            <NavList tasks={[
                {
                    id: 1,
                    icon: menuImg,
                    text: 'All tasks',
                    active: true,
                }
            ]} />
            <NavList tasks={[
                {
                    id: 1,
                    color: 'red',
                    text: 'Groceries',
                },
                {
                    id: 2,
                    color: 'blue',
                    text: 'Housework',
                },
                {
                    id: 3,
                    color: 'green',
                    text: 'Education',
                },
            ]} />
        </div>
        <div className="todo-app__tasks">
            aaaa
        </div>
    </div>
    );
}

export default App;
