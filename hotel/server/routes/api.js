const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

// declare axios for making http requests
const axios = require('axios');
const ObjectId = require('mongodb').ObjectID;
var db;

MongoClient.connect('mongodb://test1:testone1@ds135952.mlab.com:35952/testone123',
    { useNewUrlParser: true }, (err, database) => {
        if (err) return console.log(err)
        db = database.db('testone123');
    });

router.get('/authuser/:EmployeeName/:password', (req, res2) => {
    var EmployeeName = req.params.EmployeeName;
    var password = req.params.password;
    db.collection('employee').findOne({ "EmployeeName": EmployeeName }, {
        password: 1, role: 1,
        _id: 0
    }, function (err, result) {
        bcrypt.compare(password, result.password, function (err, res) {
            if (res) {
                res2.send([{ "auth": true, "role": result.role }]);
            } else {
                res2.send([{ "auth": false }]);
            }
        });
    });
});


router.get('/reguser/:EmployeeName/:password/:EmployeeContact/:role/:EmiloyeeEmail/:eMailingAddress/:eAccountNumber', (req, res) => {
    bcrypt.hash(req.params.password, BCRYPT_SALT_ROUNDS, function (err, hash) {
        db.collection('employee').save({
            "EmployeeName": req.params.EmployeeName, "password": hash, "EmployeeContact": req.params.EmployeeContact, "role": req.params.role, "EmiloyeeEmail": req.params.EmiloyeeEmail, "eMailingAddress": req.params.eMailingAddress, "eAccountNumber": req.params.eAccountNumber
        }, (err, result) => {
            if (err) alert("error");;


        });
    });
})

router.post('/room', (req, res) => {
    db.collection('RoomStatus').insertOne(req.body, (err, result) => {
        if (err) return
        res.redirect('/')
    });
});

// Get all user Transaction 
router.get('/room', function (req, res) {
    db.collection('RoomStatus').find().toArray((err, results) => { res.send(results) });
});

// update post based on id
router.route('/uproom/:_id').put(function (req, res) {
    db.collection('RoomStatus').updateOne({ "_id": ObjectId(req.params._id) }, { $set: req.body });
});
module.exports = router;