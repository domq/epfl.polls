var passport = require('passport');
var tequila = require('../lib/tequila');
var express = require('express');
var router = express.Router();
var db = require('../lib/db');


passport.use(tequila.strategy);

/* GET home page. */
router.get('/', tequila.strategy.ensureAuthenticated, function(req, res) {
    res.render('index', { title: 'Polls', user: req.user });
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

router.post('/submit', tequila.strategy.ensureAuthenticated, function(req, res) {
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


router.get('/logout', tequila.strategy.globalLogout("/"));

module.exports.router = router;
