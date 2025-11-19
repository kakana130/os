function calculateNeed(allocation, maximum) {
    const numProcesses = allocation.length;
    const numResources = allocation[0].length;
    const need = Array.from({ length: numProcesses }, () => Array(numResources).fill(0));

    for (let i = 0; i < numProcesses; i++) {
        for (let j = 0; j < numResources; j++) {
            need[i][j] = maximum[i][j] - allocation[i][j];
        }
    }
    return need;
}

function isSafeState(available, allocation, maximum) {
    const numProcesses = allocation.length;
    const numResources = available.length;
    const work = [...available];
    const finish = Array(numProcesses).fill(false);
    const safeSequence = [];

    let found;
    do {
        found = false;
        for (let i = 0; i < numProcesses; i++) {
            if (!finish[i]) {
                const need = calculateNeed(allocation, maximum)[i];
                if (need.every((n, j) => n <= work[j])) {
                    for (let j = 0; j < numResources; j++) {
                        work[j] += allocation[i][j];
                    }
                    finish[i] = true;
                    safeSequence.push(i);
                    found = true;
                }
            }
        }
    } while (found);

    return {
        safe: finish.every(f => f),
        safeSequence: safeSequence.map(i => `P${i}`)
    };
}

export { calculateNeed, isSafeState };