const express = require('express');
var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// TODO - NemID Code Generator
// 01. Will receive a POST request with JSON body
// 02. Check against the data from the database. If it matches this will return a JSON body with status code 200. Otherwise it will return a 403 (forbidden)

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = new sqlite3.Database('../NemID_ESB/nem_id_database.sqlite');
var jsonParser = bodyParser.json();

app.listen(8090, (err) => {
    if(err){
        console.log(err);
    } else {
    console.log(`Code generator | Listening on port 8090`)
    }
})

// 01
app.post('/nemid-auth', jsonParser, async (req, res) => {
    let nemId = req.body.nemId;
    let nemIdCode = req.body.nemIdCode;

    let response = { "generatedCode": + Math.floor(Math.random() * 900000) + 100000 };

    let sql = "SELECT * FROM user WHERE NemID = ? AND Password = ?";

    // 02

    db.get(sql, [nemId, nemIdCode], (err, rows) => {
        if (rows !== undefined) {
            res.status(200).send(response);
            
        } else if(err){
        res.status(403).send();
        }
        else {
        res.status(403).send();
        }
        
    });


});


// db.all(sql, [nemId, nemIdCode], (err, rows) => {
//     if (err) {
//         console.log(err);
//     } else {
//         if (nemId === 464521403 && nemIdCode === 4603) {
//             console.log("yay")
//             return res.status(200).send(response);
//         }
//         else {
//             console.log("sad")
//             return res.status(403).send(); 
//         }
//     }
// });


// else {
//     if (rows.row.NemID != nemId && rows.row.Password != nemIdCode) {
//         console.log("sad")
//         return res.status(200).send(response);
//     }
//     else {
//         console.log("hi")
//         return res.status(403).send(); 
//     }
// }



// db.all(sql, [], (err, rows) => {
//     if (err) {
//         return console.log(err);
//     }
//     rows.forEach((row) => {
//         let userNemIdCode = row.NemID.slice(0,2) + row.CPR.slice(-2);
//         if (nemId === row.NemID) {
//             console.log("hi")
//             return res.status(200).send(response);
//         } else {
//             console.log("saaad")
//             return res.status(403).send(); 
//         }
//     });
// });