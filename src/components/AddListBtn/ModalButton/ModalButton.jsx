import React from 'react';
import './ModalButton.scss';

export default ({type, onClick}) => {
    return (
        <button onClick={onClick} className={`modal-button modal-button_${type}`} >{type === 'add' ? 'Add' : 'Cancel'}</button>
    );
}

