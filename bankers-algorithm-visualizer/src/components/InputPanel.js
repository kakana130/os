import React, { useState } from 'react';

const InputPanel = ({ onInputChange }) => {
    const [numProcesses, setNumProcesses] = useState(3);
    const [numResources, setNumResources] = useState(3);
    const [allocation, setAllocation] = useState([]);
    const [maximum, setMaximum] = useState([]);
    const [available, setAvailable] = useState([]);

    const handleNumProcessesChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setNumProcesses(value);
        updateMatrices(value, numResources);
    };

    const handleNumResourcesChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setNumResources(value);
        updateMatrices(numProcesses, value);
    };

    const updateMatrices = (processes, resources) => {
        setAllocation(Array(processes).fill().map(() => Array(resources).fill(0)));
        setMaximum(Array(processes).fill().map(() => Array(resources).fill(5)));
        setAvailable(Array(resources).fill(10));
        onInputChange({ allocation, maximum, available });
    };

    const handleAllocationChange = (processIndex, resourceIndex, value) => {
        const newAllocation = [...allocation];
        newAllocation[processIndex][resourceIndex] = Math.max(0, value);
        setAllocation(newAllocation);
        onInputChange({ allocation: newAllocation, maximum, available });
    };

    const handleMaximumChange = (processIndex, resourceIndex, value) => {
        const newMaximum = [...maximum];
        newMaximum[processIndex][resourceIndex] = Math.max(0, value);
        setMaximum(newMaximum);
        onInputChange({ allocation, maximum: newMaximum, available });
    };

    const handleAvailableChange = (resourceIndex, value) => {
        const newAvailable = [...available];
        newAvailable[resourceIndex] = Math.max(0, value);
        setAvailable(newAvailable);
        onInputChange({ allocation, maximum, available: newAvailable });
    };

    return (
        <div className="input-panel">
            <h2>Input Panel</h2>
            <div>
                <label>Number of Processes:</label>
                <input type="number" value={numProcesses} onChange={handleNumProcessesChange} min="1" />
            </div>
            <div>
                <label>Number of Resources:</label>
                <input type="number" value={numResources} onChange={handleNumResourcesChange} min="1" />
            </div>
            <h3>Allocation Matrix</h3>
            {allocation.map((row, i) => (
                <div key={i}>
                    {row.map((val, j) => (
                        <input
                            key={j}
                            type="number"
                            value={val}
                            onChange={(e) => handleAllocationChange(i, j, parseInt(e.target.value))}
                            min="0"
                        />
                    ))}
                </div>
            ))}
            <h3>Maximum Matrix</h3>
            {maximum.map((row, i) => (
                <div key={i}>
                    {row.map((val, j) => (
                        <input
                            key={j}
                            type="number"
                            value={val}
                            onChange={(e) => handleMaximumChange(i, j, parseInt(e.target.value))}
                            min="0"
                        />
                    ))}
                </div>
            ))}
            <h3>Available Resources</h3>
            {available.map((val, i) => (
                <div key={i}>
                    <label>Resource {i}:</label>
                    <input
                        type="number"
                        value={val}
                        onChange={(e) => handleAvailableChange(i, parseInt(e.target.value))}
                        min="0"
                    />
                </div>
            ))}
        </div>
    );
};

export default InputPanel;