import React, { useState } from 'react';
import NavList from '../NavList/NavList';

import plusImg from '../../assets/img/plus.png';
import './AddListBtn.scss';

const AddListBtn = () => {
    const [isVisible, setVisibility] = useState(false);
    const colors = ['red', 'green', 'blue', 'purple', 'yellow'];
    return (
        <div className="add-list">
            <NavList
                tasks={[
                    {
                        id: 1,
                        icon: plusImg,
                        text: 'Add task list',
                    },
                ]}
                onClick={() => setVisibility(true)}
            />
            {isVisible && (
                <div className="add-list__modal">
                    <input
                        type="text"
                        name="taskName"
                        className="add-list__task-name"
                    />
                </div>
            )}
        </div>
    );
};

export default AddListBtn;
