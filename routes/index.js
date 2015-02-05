var express = require('express');
var router = express.Router();

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "pollsAnswer"];
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

  db.pollsAnswer.find({}, function(err, pollsAnswers) {
    if( err || !pollsAnswers) console.log("poll answer found");
    else renderNow(pollsAnswers);
  });
});

router.get('/result', function(req, res) {
  var dboutput="";
  function renderNow(pollsResults) {
    res.render('result', { title: 'Result', pollsAnswers: pollsResults });
  }
  //db.pollsAnswer.find({"food":5, "conf": 0, "sport": 4, "team": 4}).count()
  db.pollsAnswer.find({}).count(
    function (err, countAnswer) {
      renderNow({total: countAnswer})
    }
  )
});


router.post('/submit', function(req, res) {
  var posted = req.body;
  var user = posted.user;
  function renderNow() {
    res.render('submit', { title: 'submit' });
  }
  db.pollsAnswer.save(posted, function(err, saved) {
    if( err || !saved ) console.log("Poll not saved");
    else console.log("Poll saved");
  });

  renderNow();
});

module.exports = router;
