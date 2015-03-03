var passport = require('passport');
var express = require('express');
var router = express.Router();

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "pollsAnswer"];
var db = require("mongojs").connect(databaseUrl, collections);

var tequila = require('passport-tequila');
var myStrategy = new tequila.Strategy({
        service: "DOJO Polls",  // Appears on Tequila login screen
        request: ["displayname", "firstname"],  // Personal info to fetch
    },
    function myVerify(accessToken, refreshToken, profile, done) {
        // Pretend the verification is asynchronous (as would be required
        // e.g. if using a database):
        process.nextTick(function () {
            done(null, profile);
        });
    }
);
passport.use(myStrategy);

/* GET home page. */
router.get('/', myStrategy.ensureAuthenticated, function(req, res) {
    res.render('index', { title: 'Polls', user: req.user });
});

router.get('/admin', myStrategy.ensureAuthenticated, function(req, res) {
  var dboutput="";
  function renderNow(pollsAnswers) {
    res.render('admin', { title: 'Admin', user: req.user.displayName, databaseContents: dboutput, pollsAnswers: pollsAnswers });
  }

  db.pollsAnswer.find({}, function(err, pollsAnswers) {
    if( err || !pollsAnswers) console.log("poll answer found");
    else renderNow(pollsAnswers);
  });
});

router.get('/results', function(req, res) {
  db.pollsAnswer.mapReduce(
      function(){emit(this.order[0], 1)},
      function(key,values){return Array.sum(values)},
      {out: {inline: 1}},
      function (err, mapReduced) {
          res.render('result', { title: 'Results', results: mapReduced });
      }
  )
});

router.get('/init', function(req, res) {
    var entry = {"order":["food","team","conf","sport"],"user":"toto"};
    db.pollsAnswer.save(entry, function(err, saved) {
        if( err || !saved ) console.log("Entry not saved");
        else console.log("Entry saved");
    });
    res.render('submit', { title: 'submit' });
});

router.post('/submit', myStrategy.ensureAuthenticated, function(req, res) {
  var posted = req.body;
  posted.user = req.user.id;

  function renderNow() {
    res.render('submit', { title: 'submit' });
  }
  var oldStyleVotes = false;
  if (oldStyleVotes) {

      db.pollsAnswer.save(posted, function(err, saved) {
          if( err || !saved ) console.log("Poll not saved");
          else console.log("Poll saved");
      });

  } else {
      db.runCommand(
          {
              findAndModify: "pollsAnswer",
              query: {user: posted.user},
              update: posted,
              upsert: true
          }
      );
  }
  renderNow();
});

module.exports = router;
router.get('/logout', myStrategy.globalLogout("/"));