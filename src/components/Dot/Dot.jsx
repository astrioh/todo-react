import React from 'react';
import './Dot.scss';

const Dot = ({ color, size, onClick, active}) => {
    return (
        <div onClick={onClick} className={`dot dot_${color}` + (size ? ` dot_${size}` : '') + (active ? ` dot_active` : '')}></div>
    )
}

export default Dot;