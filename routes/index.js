const express = require('express')
const firebase = require('firebase')
const router = express.Router()

var app = express();
app.use('/', function(req, res, next) {
  const config = {
    apiKey: 'AIzaSyC67YlaL3PDKvlW7-GOX4t2K-5HvgrjanQ',
    authDomain: 'jasa-project-foundry.firebaseapp.com',
    databaseURL: 'https://jasa-project-foundry.firebaseio.com',
    projectId: 'jasa-project-foundry',
    storageBucket: 'jasa-project-foundry.appspot.com',
    messagingSenderId: '373535287386'
  }
  firebase.initializeApp(config)
  let ongoingProjectsRef = firebase.database().ref('ongoingProjects')
  let finishedProjectsRef = firebase.database().ref('finishedProjects')
  let ongoingProjectsTiles = []
  let finishedProjectsTiles = []
  ongoingProjectsRef.on('value', function (snapshot) {
    for (const key in snapshot.val()) {
      ongoingProjectsTiles.push(snapshot.val()[key])
    }
  }, function (error) {
    console.log('Error: ' + error.code)
  })
  finishedProjectsRef.on('value', function (snapshot) {
    for (const key in snapshot.val()) {
      finishedProjectsTiles.push(snapshot.val()[key])
    }
  }, function (error) {
    console.log('Error: ' + error.code)
  })

  let options = {
    title: "JASA | Project Foundry",
    ongoingProjectsTilesExport: ongoingProjectsTiles,
    finishedProjectsTilesExport: finishedProjectsTiles
  }

  res.locals.options = options;

  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(res.locals.options);
  res.render('index', options=res.locals.options);
});

module.exports = router;
