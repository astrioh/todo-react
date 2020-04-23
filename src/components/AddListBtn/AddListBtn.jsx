import React, { useState, useEffect } from 'react';
import NavList from '../NavList/NavList';
import axios from 'axios';

import plusImg from '../../assets/img/plus.png';
import './AddListBtn.scss';
import Button from '../Button/Button';
import Dot from '../Dot/Dot';

const AddListBtn = ({ colors, onAddTheme, themeLastId }) => {
    const [isVisible, setVisibility] = useState(false);
    const [selectedColor, setSelectedColor] = useState(1);
    const [themeName, setThemeName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const closeAddModal = () => {
        setSelectedColor(colors[0].id);
        setThemeName('');
        setVisibility(false);
    };

    const addTheme = () => {
        if (themeName === '') {
            alert('Enter theme name');
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3005/themes', {
                text: themeName,
                colorId: selectedColor,
            })
            .then(({ data }) => {
                const color = colors.find(
                    (color) => color.id === selectedColor
                );
                const newTheme = { ...data, color, tasks: [] };
                onAddTheme(newTheme);
                closeAddModal();
            })
            .catch((data) => {
                alert('Something went wrong when adding a theme');
                throw new Error(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="add-list">
            <NavList
                items={[
                    {
                        id: 1,
                        icon: plusImg,
                        text: 'Add theme list',
                    },
                ]}
                onClick={() => setVisibility(true)}
            />
            {isVisible && (
                <div className="add-list__modal">
                    <input
                        value={themeName}
                        type="text"
                        name="themeName"
                        className="add-list__task-name textfield"
                        placeholder="Theme name"
                        onChange={(e) => setThemeName(e.currentTarget.value)}
                    />
                    <div className="add-list__colors">
                        {colors.map((color) => (
                            <Dot
                                onClick={() => setSelectedColor(color.id)}
                                key={color.id}
                                color={color.name}
                                size="medium"
                                active={selectedColor === color.id}
                            />
                        ))}
                    </div>
                    <div className="add-list__controls">
                        <div className="add-list__add">
                            <Button type="add" text={isLoading ? 'Adding...' : 'Add'} onClick={addTheme} />
                        </div>
                        <div className="add-list__cancel">
                            <Button
                                disabled={isLoading}
                                type="cancel"
                                text="Cancel"
                                onClick={closeAddModal}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddListBtn;
