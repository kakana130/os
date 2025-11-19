// This file contains validation functions to ensure that user inputs are within acceptable ranges and formats.

export const validateNumberOfProcesses = (num) => {
    const parsedNum = parseInt(num);
    return !isNaN(parsedNum) && parsedNum > 0 && parsedNum <= 10; // Allow 1 to 10 processes
};

export const validateNumberOfResources = (num) => {
    const parsedNum = parseInt(num);
    return !isNaN(parsedNum) && parsedNum > 0 && parsedNum <= 5; // Allow 1 to 5 resources
};

export const validateMatrixInput = (matrix) => {
    return matrix.every(row => Array.isArray(row) && row.every(val => Number.isInteger(val) && val >= 0));
};

export const validateAvailableResources = (available) => {
    return Array.isArray(available) && available.every(val => Number.isInteger(val) && val >= 0);
};