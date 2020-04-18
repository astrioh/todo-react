import React from 'react';
import './Dot.scss';

const Dot = ({ color, size }) => {
    return (
        <div className={size ? `dot dot_${color} dot_${size}` : `dot dot_${color}`}></div>
    )
}

export default Dot;