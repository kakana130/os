// This file serves as the main JavaScript entry point for the Banker's Algorithm Visualizer application.

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import InputPanel from './components/InputPanel';
import MatrixDisplay from './components/MatrixDisplay';
import ResultPanel from './components/ResultPanel';
import Controls from './components/Controls';
import { bankerAlgorithm } from './algorithms/bankerAlgorithm';
import './index.css';

const App = () => {
    const [numProcesses, setNumProcesses] = useState(3);
    const [numResources, setNumResources] = useState(3);
    const [allocation, setAllocation] = useState([]);
    const [maximum, setMaximum] = useState([]);
    const [available, setAvailable] = useState([]);
    const [need, setNeed] = useState([]);
    const [safeSequence, setSafeSequence] = useState([]);
    const [isSafe, setIsSafe] = useState(null);

    const handleInputChange = (alloc, max, avail) => {
        setAllocation(alloc);
        setMaximum(max);
        setAvailable(avail);
    };

    const calculateStatus = () => {
        const result = bankerAlgorithm(allocation, maximum, available);
        setNeed(result.need);
        setSafeSequence(result.safeSequence);
        setIsSafe(result.isSafe);
    };

    return (
        <div className="app-container">
            <h1>Banker's Algorithm Visualizer</h1>
            <InputPanel 
                numProcesses={numProcesses} 
                numResources={numResources} 
                onInputChange={handleInputChange} 
            />
            <Controls onCalculate={calculateStatus} />
            <MatrixDisplay 
                allocation={allocation} 
                maximum={maximum} 
                need={need} 
                available={available} 
            />
            <ResultPanel 
                safeSequence={safeSequence} 
                isSafe={isSafe} 
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));