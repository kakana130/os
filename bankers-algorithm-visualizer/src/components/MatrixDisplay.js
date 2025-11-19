import React from 'react';

const MatrixDisplay = ({ allocation, maximum, need, work }) => {
    return (
        <div className="matrix-display">
            <h2>Resource Allocation Matrices</h2>
            <div className="matrix-container">
                <div className="matrix">
                    <h3>Allocation Matrix</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Process</th>
                                {allocation[0].map((_, index) => (
                                    <th key={index}>R{index}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allocation.map((row, rowIndex) => (
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

                <div className="matrix">
                    <h3>Maximum Matrix</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Process</th>
                                {maximum[0].map((_, index) => (
                                    <th key={index}>R{index}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {maximum.map((row, rowIndex) => (
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

                <div className="matrix">
                    <h3>Need Matrix</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Process</th>
                                {need[0].map((_, index) => (
                                    <th key={index}>R{index}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {need.map((row, rowIndex) => (
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

                <div className="matrix">
                    <h3>Work Matrix</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Work</th>
                                {work.map((value, index) => (
                                    <th key={index}>R{index}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Work</td>
                                {work.map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MatrixDisplay;