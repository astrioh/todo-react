import React from 'react';
import './Button.scss';

export default ({type, text, onClick, disabled}) => {
    // Set width and height of this component by wrapping it in another block
    return (
        <button disabled={disabled} onClick={onClick} className={`modal-button modal-button_${type}`} >{text}</button>
    );
}

