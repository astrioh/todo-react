import React from 'react';
import './Dot.scss';

const Dot = ({ color }) => {
    return (
        <div className={`dot dot_${color}`}></div>
    )
}

export default Dot;