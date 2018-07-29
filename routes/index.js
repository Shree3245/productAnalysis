var express = require('express');
var firebase = require('firebase');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var router = express.Router();

var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function (resp) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log("4");
    } else if (httpRequest.readyState === 3) {
        console.log("3");
    } else if (httpRequest.readyState === 2) {
        console.log("2");
    } else if (httpRequest.readyState === 1) {
        console.log("1");
    } else if (httpRequest.readyState === 0) {
        console.log("0");
    } else {
        console.log(httpRequest.status);
    }
};

var config = {
    apiKey: "AIzaSyC67YlaL3PDKvlW7-GOX4t2K-5HvgrjanQ",
    authDomain: "jasa-project-foundry.firebaseapp.com",
    databaseURL: "https://jasa-project-foundry.firebaseio.com",
    projectId: "jasa-project-foundry",
    storageBucket: "jasa-project-foundry.appspot.com",
    messagingSenderId: "373535287386"
};
firebase.initializeApp(config);

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
    fetch("http://sentiment.vivekn.com/api/text/",
        {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Content-Type': "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: JSON.stringify({ txt: 'hi'})
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) });

    res.render('index', { title: "JASA | Project Foundry", ongoingProjects: res.locals.ongoingProjects })
});

module.exports = router;