var express = require('express');
var router = express.Router();
var tequila = require('../lib/tequila');
var db = require('../lib/db');


router.get('/admin', tequila.strategy.ensureAuthenticated, function(req, res) {
    var dboutput="";
    function renderNow(pollsAnswers) {
        res.render('admin', { title: 'Admin', user: req.user.displayName, databaseContents: dboutput, pollsAnswers: pollsAnswers });
    }

    db.pollsAnswer.find({}, function(err, pollsAnswers) {
        if( err || !pollsAnswers) console.log("poll answer found");
        else renderNow(pollsAnswers);
    });
});

module.exports.router = router;