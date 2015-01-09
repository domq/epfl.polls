var express = require('express');
var router = express.Router();

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "pollsAnswer"]
var db = require("mongojs").connect(databaseUrl, collections);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Polls' });
});

router.get('/admin', function(req, res) {
  var dboutput="";
  function renderNow(pollsAnswers) {
    res.render('admin', { title: 'Admin', databaseContents: dboutput, pollsAnswers: pollsAnswers });
  }

  db.users.find({sex: "male"}, function(err, users) {
    if( err || !users) console.log("male users found");
    else users.forEach( function(user) {
      dboutput += user.email;
    } );
    db.pollsAnswer.find({}, function(err, pollsAnswers) {
      if( err || !pollsAnswers) console.log("male users found");
      else renderNow(pollsAnswers);
    });
  });
});


router.post('/submit', function(req, res) {
  var user = req.body.user;
  function renderNow() {
    res.render('submit', { title: 'submit' });
  }
  db.pollsAnswer.save({order: req.body.order, user: req.body.user}, function(err, saved) {
    if( err || !saved ) console.log("Poll not saved");
    else console.log("Poll saved");
  });

  renderNow();
});

module.exports = router;
