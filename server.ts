const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
sqlite3 = require('sqlite3').verbose();
const app = express();
const hostname = "localhost";
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

var db = new sqlite3.Database('weatherApp');

app.get('/getUser', function (req,res) {
    let output;
    db.get("SELECT username un, userId ui FROM users WHERE username = ?", req.query.username, (err, row) => {
        if (err) {
            output = err;
            console.log(err);
        }
        output = row 
        ? row
        : `No user found with the username ${req.query.username}`;
        output = JSON.stringify(output);
        res.end(output);
    })
})

app.get('/getLocations', function (req,res) {
    let output;
    db.get("SELECT userId ui FROM users WHERE username = ?", req.query.username, (err,response) => {
        if (err) {
            output = err;
        }
        db.get("SELECT location location FROM locations WHERE userId = ?", response.ui, (err, row) => {
            if (err) {
                output = err;
            }
            output = row;
            output = JSON.stringify(output);
            res.end(output);
        })
    })
})

app.post('/addUser', function (req,res) {
    let output;
    let newUserId;
    db.serialize(() => {
        db.get("SELECT (SELECT COUNT(*) FROM users) AS userQuantity", (err, value) => {
            if (err) {
                output = err;
            }
            newUserId = value.userQuantity + 1;

            db.run(`INSERT INTO users (username, userId) VALUES ('${req.body.username}', ${newUserId})`, (err,response) => {
                if (err) {
                    output = err;
                }
                output = 'User successfully added!';
                output = JSON.stringify(output);
                res.end(output);
            })
        })
    })
})

app.post('/updateUser', function (req,res) {
    let output;
    db.serialize(() => {
        db.get("SELECT userId ui FROM users WHERE username = ?", req.body.username, (err, response) => {
            if (err) {
                output = err;
            }
            db.run(`INSERT INTO locations (userId, location) VALUES (${response.ui}, '${req.body.location}')`, (err, response) => {
                if (err) {
                    output = err;
                }
                output = 'Location added!';
                output = JSON.stringify(output);
                res.end(output);
            })
        })
    })
})

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});