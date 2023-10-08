const express = require('express');
const app = express();
const port = 3000;

const validateNumbers = (req, res, next) => {
    if (req.query.nums === undefined) {
        req.isNullQuery = true;
    }

    const numStrings = (req.query.nums || "").split(',');

    for (let str of numStrings) {
        if (isNaN(Number(str))) {
            return res.status(400).send({
                operation: req.path.substring(1),
                value: `${str} is not a number`
            });
        }
    }

    const nums = numStrings.map(Number);

    if (nums.length === 0) {
        return res.status(400).send({
            operation: req.path.substring(1),
            value: 'nums are required'
        });
    }

    req.nums = nums;
    next();
}

app.use(validateNumbers);

app.get('/mean', (request, response) => {
    if (request.isNullQuery) {
        return response.status(400).send({
            operation: 'mean',
            value: 'nums are required'
        });
    }

    const nums = (request.query.nums || "").split(',').map(Number);

    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }

    let mean = total / nums.length;

    response.send({
        "operation": 'mean',
        'value': mean
    });
});

app.get('/median', (request, response) => {
    if (request.isNullQuery) {
        return response.status(400).send({
            operation: 'median',
            value: 'nums are required'
        });
    }

    const nums = (request.query.nums || "").split(',').map(Number);

    const mid = Math.floor(nums.length / 2);
    const sortedArr = nums.sort((a, b) => a - b);
    let median;

    if (nums.length % 2 === 0) {
        median = (sortedArr[mid - 1] + sortedArr[mid]) / 2;
    } else {
        median = sortedArr[mid];
    }

    response.send({
        "operation": 'median',
        'value': median
    });
});

app.get('/mode', (request, response) => {
    if (request.isNullQuery) {
        return response.status(400).send({
            operation: 'mode',
            value: 'nums are required'
        });
    }

    const nums = (request.query.nums || "").split(',').map(Number);

    let count = {};
    for (let i = 0; i < nums.length; i++) {    
        count[nums[i]] = (count[nums[i]] || 0) + 1;
    } 
    
    if (nums.length === 0) {
        return response.status(400).send({
            operation: 'mode',
            value: 'nums are required'
        });
    }

    let mode;
    let maxCount = 0;

    for (const [num, freq] of Object.entries(count)) {
        if (freq > maxCount) {
            maxCount = freq;
            mode = Number(num);
        }
    }

    response.send({
        "operation": 'mode',
        'value': mode
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost: ${port}/`);
});

module.exports = app;