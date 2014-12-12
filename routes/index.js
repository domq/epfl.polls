var redis = require("redis"),
client = redis.createClient();

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Polls' });
});

router.get('/admin', function(req, res) {
  var dboutput="";
  function renderNow() {
    res.render('admin', { title: 'Admin', databaseContents: dboutput });
  }
  client.keys("*", function (err, keys) {
    var doneCount = 0;
    for(var i = 0, len = keys.length; i < len; i++) {
      dboutput +=keys[i];

      client.get(keys[i], function (err, val) {
        dboutput += val;
        doneCount += 1;
        if (doneCount == keys.length) {
          renderNow();
        }
      });

    }
    //client.quit();
  });
});

module.exports = router;
