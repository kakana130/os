let numProc = 3;
let numRes = 3;
let allocation = [];
let maximum = [];
let available = [];
let need = [];
let work = [];

const numProcEl = document.getElementById('numProc');
const numResEl = document.getElementById('numRes');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const checkBtn = document.getElementById('checkBtn');
const availableInputs = document.getElementById('availableInputs');
const resultCard = document.getElementById('resultCard');
const resultContent = document.getElementById('resultContent');
const stepLog = document.getElementById('stepLog');

numProcEl.addEventListener('change', () => initMatrices());
numResEl.addEventListener('change', () => initMatrices());

function initMatrices() {
    numProc = Math.max(1, parseInt(numProcEl.value) || 3);
    numRes = Math.max(1, parseInt(numResEl.value) || 3);

    allocation = Array(numProc).fill(0).map(() => Array(numRes).fill(0));
    maximum = Array(numProc).fill(0).map(() => Array(numRes).fill(5));
    available = Array(numRes).fill(10);

    renderInputTables();
    renderAvailableInputs();
    calculateNeed();
    renderOutputTables();
    resultCard.classList.add('hidden');
}

generateBtn.addEventListener('click', () => {
    // Random เลือกระหว่าง Safe หรือ Unsafe case
    const randomCase = Math.random();

    if (randomCase < 0.5) {
        // Case 1: Safe State (Random ปกติ)
        allocation = Array(numProc).fill(0).map(() =>
            Array(numRes).fill(0).map(() => Math.floor(Math.random() * 3))
        );
        maximum = allocation.map(row =>
            row.map(val => val + Math.floor(Math.random() * 4))
        );
        available = Array(numRes).fill(0).map(() => Math.max(10, Math.floor(Math.random() * 20)));
    } else {
        // Case 2: Unsafe State (Available น้อยเกินไป)
        allocation = Array(numProc).fill(0).map(() =>
            Array(numRes).fill(0).map(() => Math.floor(Math.random() * 5) + 2)
        );
        maximum = allocation.map(row =>
            row.map(val => val + Math.floor(Math.random() * 3) + 2)
        );
        available = Array(numRes).fill(0).map(() => Math.floor(Math.random() * 3));
    }

    renderInputTables();
    renderAvailableInputs();
    calculateNeed();
    renderOutputTables();
    resultCard.classList.add('hidden');
});

resetBtn.addEventListener('click', () => {
    numProcEl.value = '3';
    numResEl.value = '3';
    initMatrices();
});

function renderInputTables() {
    // Allocation Table
    let html = '<table><tr><th>P\\R</th>' + Array.from({
        length: numRes
    }, (_, i) => `<th>R${i}</th>`).join('') + '</tr>';
    allocation.forEach((row, i) => {
        html += `<tr><td>P${i}</td>`;
        row.forEach((val, j) => {
            html += `<td><input type="number" min="0" max="99" value="${val}" data-type="alloc" data-i="${i}" data-j="${j}" /></td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    document.getElementById('allocationInputTable').innerHTML = html;

    // Maximum Table
    html = '<table><tr><th>P\\R</th>' + Array.from({
        length: numRes
    }, (_, i) => `<th>R${i}</th>`).join('') + '</tr>';
    maximum.forEach((row, i) => {
        html += `<tr><td>P${i}</td>`;
        row.forEach((val, j) => {
            html += `<td><input type="number" min="0" max="99" value="${val}" data-type="max" data-i="${i}" data-j="${j}" /></td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    document.getElementById('maximumInputTable').innerHTML = html;

    // Attach input listeners
    document.querySelectorAll('[data-type]').forEach(inp => {
        inp.addEventListener('change', e => {
            const type = e.target.dataset.type;
            const i = parseInt(e.target.dataset.i);
            const j = parseInt(e.target.dataset.j);
            const val = Math.max(0, parseInt(e.target.value) || 0);
            if (type === 'alloc') allocation[i][j] = val;
            else if (type === 'max') maximum[i][j] = val;
            e.target.value = val;
            calculateNeed();
            renderOutputTables();
        });
    });
}

function renderAvailableInputs() {
    availableInputs.innerHTML = '';
    available.forEach((val, i) => {
        const fg = document.createElement('div');
        fg.className = 'form-group';
        fg.innerHTML = `
                        <label>Resource R${i}</label>
                        <input type="number" min="0" max="99" value="${val}" data-idx="${i}" class="availInput" />
                    `;
        availableInputs.appendChild(fg);
    });

    document.querySelectorAll('.availInput').forEach(inp => {
        inp.addEventListener('change', e => {
            const idx = parseInt(e.target.dataset.idx);
            const val = Math.max(0, parseInt(e.target.value) || 0);
            available[idx] = val;
            e.target.value = val;
            renderOutputTables();
        });
    });
}

function calculateNeed() {
    need = allocation.map((row, i) =>
        row.map((val, j) => Math.max(0, maximum[i][j] - allocation[i][j]))
    );
}

function renderOutputTables() {
    // Need Table
    let html = '<table><tr><th>P\\R</th>' + Array.from({
        length: numRes
    }, (_, i) => `<th>R${i}</th>`).join('') + '</tr>';
    need.forEach((row, i) => {
        html += `<tr><td>P${i}</td>` + row.map(v => `<td>${v}</td>`).join('') + '</tr>';
    });
    html += '</table>';
    document.getElementById('needTable').innerHTML = html;

    // Work Table
    html = '<table><tr><th>Resource</th>' + Array.from({
        length: numRes
    }, (_, i) => `<th>R${i}</th>`).join('') + '</tr>';
    html += '<tr><td>Work</td>' + available.map(v => `<td>${v}</td>`).join('') + '</tr>';
    html += '</table>';
    document.getElementById('workTable').innerHTML = html;

    // Finish Table
    html = '<table><tr><th>Process</th><th>Status</th></tr>';
    for (let i = 0; i < numProc; i++) {
        html += `<tr><td>P${i}</td><td style="color: var(--danger); font-weight: 600;">False</td></tr>`;
    }
    html += '</table>';
    document.getElementById('finishTable').innerHTML = html;
}

checkBtn.addEventListener('click', () => {
    const result = bankerAlgorithm();
    renderResult(result);
});

function bankerAlgorithm() {
    const logs = [];
    work = [...available];
    const finish = Array(numProc).fill(false);
    const safeSeq = [];

    logs.push('=== Banker\'s Algorithm - Safety Check ===');
    logs.push(`Initial Available: [${work.join(', ')}]`);
    logs.push('');

    let stepCounter = 1;

    for (let iteration = 0; iteration < numProc; iteration++) {
        let found = false;

        for (let i = 0; i < numProc; i++) {
            if (finish[i]) continue;

            // Log the check (show thinking even if it fails)
            logs.push(`Step ${stepCounter}: `);
            logs.push(`Need[P${i}]: [${need[i].join(', ')}]`);
            logs.push(`Work: [${work.join(', ')}]`);

            // Check if Need[i] <= Work
            let canAllocate = true;
            for (let j = 0; j < numRes; j++) {
                if (need[i][j] > work[j]) {
                    canAllocate = false;
                    break;
                }
            }

            logs.push(`Need[P${i}] <= Work ${canAllocate ? '✓' : '✗'}`);

            if (canAllocate) {
                logs.push(`✓ Process P${i} can be satisfied`);
                // Release resources
                logs.push(`   Release Allocation[P${i}]: [${allocation[i].join(', ')}]`);
                for (let j = 0; j < numRes; j++) {
                    work[j] += allocation[i][j];
                }
                logs.push(`   New Work: [${work.join(', ')}]`);

                finish[i] = true;
                safeSeq.push(i);
                found = true;
                logs.push('');
                stepCounter++;
                break;
            } else {
                logs.push(`✗ Process P${i} cannot be satisfied`);
                logs.push('');
                stepCounter++;
            }
        }

        if (!found) {
            logs.push(' No process can be satisfied');
            logs.push('=== UNSAFE STATE - DEADLOCK POSSIBLE ===');
            return {
                safe: false,
                sequence: [],
                finish: finish,
                logs
            };
        }
    }

    logs.push('=== SAFE STATE - NO DEADLOCK ===');
    logs.push(`✓ Safe Sequence Found: ${safeSeq.map(i => `P${i}`).join(' → ')}`);

    return {
        safe: true,
        sequence: safeSeq.map(i => `P${i}`),
        finish: finish,
        logs
    };
}

function renderResult(result) {
    resultCard.classList.remove('hidden');
    stepLog.innerHTML = result.logs.map(log => {
        let cls = 'step-item';
        if (log.includes('✓')) cls += ' step-success';
        if (log.includes('✗')) cls += ' step-danger';
        return `<div class="${cls}">${log}</div>`;
    }).join('');

    // Update Finish Table
    let finishHtml = '<table><tr><th>Process</th><th>Status</th></tr>';
    for (let i = 0; i < numProc; i++) {
        const status = result.finish[i] ? 'True' : 'False';
        const color = result.finish[i] ? 'var(--success)' : 'var(--danger)';
        finishHtml += `<tr><td>P${i}</td><td style="color: ${color}; font-weight: 600;">${status}</td></tr>`;
    }
    finishHtml += '</table>';
    document.getElementById('finishTable').innerHTML = finishHtml;

    if (result.safe) {
        resultContent.innerHTML = `
                        <div class="safe-sequence">
                            ✓ SYSTEM IS SAFE<br/>
                            Safe Sequence: <strong>${result.sequence.join(' → ')}</strong><br/>
                            <span style="font-size:12px;color:var(--muted)">No deadlock possible with current resource allocation</span>
                        </div>
                    `;
    } else {
        resultContent.innerHTML = `
                        <div class="unsafe">
                            ✗ SYSTEM IS UNSAFE / DEADLOCK DETECTED<br/>
                            <span style="font-size:12px;color:var(--muted)">The system is in an unsafe state. Deadlock is possible.</span>
                        </div>
                    `;
    }
}

// Initialize
initMatrices();