const express = require('express');
var bodyParser = require('body-parser');

// TODO
// 01. NemID User Generator - Will receive a POST request and return a JSON response

const app = express();
var jsonParser = bodyParser.json();


app.listen(8088, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log(`User generator | Listening on port 8088`)
    }
});

// 01
app.post('/generate-nemId', jsonParser, async (req, res) => {
    let cpr = req.body.cpr

    // Create nemID: first 5 digits random + last 4 digits of CPR
    let cprEnd = cpr.slice(-4);
    let firstNemID = Math.random() * 10000;

    let response = { "nemId": + firstNemID.toFixed(0) + cprEnd };

    return res.status(201).send(response);
});
