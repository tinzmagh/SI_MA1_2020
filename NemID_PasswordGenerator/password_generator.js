const express = require('express');
var bodyParser = require('body-parser');

// TODO
// 01. NemID Password Generator - Will receive a POST request and JSON response status(200)

const app = express();
var jsonParser = bodyParser.json();

app.listen(8089, (err) => {
    if(err){
        console.log(err);
    } else {
    console.log(`Password generator | Listening on port 8089`)
    }
});

// 01
app.post('/generate-password-nemID', jsonParser, async (req, res) => {
    let nemId = req.body.nemId;
    let cpr = req.body.cpr;

    // Make nemID password (first 2 digits of nemID + last 2 digits of cpr)
    let firstNemId = nemId.slice(0, 2);
    let cprEnd = cpr.slice(-2);

    let response = { "nemIdPassword": + firstNemId + cprEnd };

    return res.status(200).send(response);
});

