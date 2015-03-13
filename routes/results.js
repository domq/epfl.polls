var express = require('express');
var router = express.Router();
var tequila = require('../lib/tequila');
var db = require('../lib/db');


router.get('/', function(req, res) {
    db.pollsAnswer.mapReduce(
        function(){emit(this.order[0], 1)},
        function(key,values){return Array.sum(values)},
        {out: {inline: 1}},
        function (err, mapReduced) {
            res.render('result', { title: 'Results', results: mapReduced });
        }
    )
});
module.exports.router = router;