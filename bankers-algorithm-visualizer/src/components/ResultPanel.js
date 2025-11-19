import React from 'react';

const ResultPanel = ({ result }) => {
    return (
        <div className="result-panel">
            <h2>Safety Analysis Result</h2>
            {result.safe ? (
                <div className="safe-sequence">
                    <p>✓ SYSTEM IS SAFE</p>
                    <p>Safe Sequence: <strong>{result.sequence.join(' → ')}</strong></p>
                </div>
            ) : (
                <div className="unsafe">
                    <p>✗ SYSTEM IS UNSAFE / DEADLOCK DETECTED</p>
                    <p>The system is in an unsafe state. Deadlock is possible.</p>
                </div>
            )}
            <h3>Work Matrix</h3>
            <table>
                <thead>
                    <tr>
                        <th>Resource</th>
                        {result.work.map((_, index) => (
                            <th key={index}>R{index}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Work</td>
                        {result.work.map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <h3>Need Matrix</h3>
            <table>
                <thead>
                    <tr>
                        <th>Process</th>
                        {result.need[0].map((_, index) => (
                            <th key={index}>R{index}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {result.need.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>P{rowIndex}</td>
                            {row.map((value, colIndex) => (
                                <td key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultPanel;