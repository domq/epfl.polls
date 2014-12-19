var express = require('express');
var router = express.Router();

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "reports"]
var db = require("mongojs").connect(databaseUrl, collections);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Polls' });
});

router.get('/admin', function(req, res) {
  var dboutput="";
  function renderNow() {
    res.render('admin', { title: 'Admin', databaseContents: dboutput });
  }

  db.users.find({sex: "male"}, function(err, users) {
    if( err || !users) console.log("male users found");
    else users.forEach( function(user) {
      dboutput += user.email;
    } );
    renderNow();
  });
});

router.post('/submit', function(req, res) {
  var user = req.body.user;

  function renderNow() {
    res.render('submit', { title: 'submit' });
  }

  renderNow();
});

module.exports = router;
