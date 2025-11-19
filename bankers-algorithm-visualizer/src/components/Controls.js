import React from 'react';

const Controls = ({ onGenerateRandom, onReset, onCalculate }) => {
    return (
        <div className="controls">
            <button className="btn" onClick={onGenerateRandom}>Generate Random Values</button>
            <button className="btn secondary" onClick={onReset}>Reset Inputs</button>
            <button className="btn" onClick={onCalculate}>Calculate System Status</button>
        </div>
    );
};

export default Controls;