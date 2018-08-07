var express = require('express');
var firebase = require('firebase');
var router = express.Router();

router.use('/', function (req, res, next) {
    var ongoingProjectsRef = firebase.database().ref('ongoingProjects');
    var ongoingProjectsObj;
    ongoingProjectsRef.on("value", function (snapshot) {
        ongoingProjectsObj = snapshot.val();
        var ongoingList = [];
        for (key in ongoingProjectsObj) {
            ongoingList.push(ongoingProjectsObj[key]);
        }

        res.locals.ongoingProjects = ongoingList;
        next();
    }, function (error) {
        console.log("Error: " + error.code);
        res.send("<h1>Error</h1>");
    });
});

router.use('/', function (req, res, next) {
    var finishedProjectsRef = firebase.database().ref('finishedProjects');
    var finishedProjectsObj;
    finishedProjectsRef.on("value", function (snapshot) {
        finishedProjectsObj = snapshot.val();
        var finishedList = [];
        for (key in finishedProjectsObj) {
            finishedList.push(finishedProjectsObj[key]);
        }

        res.locals.finishedProjects = finishedList;
        next();
    }, function (error) {
        console.log("Error: " + error.code);
        res.send("<h1>Error</h1>");
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: "JASA | Project Foundry", ongoingProjects: res.locals.ongoingProjects })
});

module.exports = router;
