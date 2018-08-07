var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var router = express.Router();
var jsonParser = bodyParser.json();

router.get("/", (req, res) => {
    res.render("dashboard/dashboard", {title: "Foundry Dashboard"});
});

router.get("/add-project", (req, res) => {
    res.render("dashboard/add-project", {title: "Add a Project"});
});

router.post("/add-project", jsonParser, (req, res) => {
    
    // Validate if details are proper
    var title = req.body.projectTitle;
    if (title === null || title === "") {
        res.send("Check your project title, it can't be empty");
    }

    // Make the pid

    var pid = title;
    while (pid.search(' ') != -1) {
        pid = pid.replace(' ', '-');
    }
    pid = pid.toLowerCase();

    // Make the write
    var db = firebase.database().ref("ongoingProjects/" + pid);

    var project = {
        title: req.body.projectTitle,
        deadline: req.body.deadline,
        pid: pid
    }
    
    db.set(project).then( () => {
        res.send("<center><h1>Form submitted successfully</h1></center>");
    }).catch( (err) => {
        res.send("<h1>" + error + "</h1>");
    });
});

module.exports = router;