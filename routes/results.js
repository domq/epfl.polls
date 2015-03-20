var express = require('express');
var router = express.Router();
var tequila = require('../lib/tequila');
var db = require('../lib/db');

router.get('/', function(req, res) {
    function whatToDoWithTheResults(results) {
        console.log(results);
        res.render('result', { title: 'Results', results: results });
    }
    tallyResults(whatToDoWithTheResults);
});

module.exports.router = router;

function tallyResults(done) {
    db.pollsAnswer.mapReduce(
        function(){

            for (var i = this.order.length-1; i >= 0; i--) {
                emit(this.order[i], this.order.length-i);
            }


        },
        function(key,values){
            return Array.sum(values)
        },
        {
            filter: {},
            out: {inline: 1}
        },
        function (err, mapReduced) {
            done(mapReduced);
        }
    )

}

function off(){


db.pollsAnswer.mapReduce(
    function(){

        for (var i = this.order.length-1; i >= 0; i--) {
            emit(this.order[i], this.order.length-i);
        }


    },
    function(key,values){
        return Array.sum(values)
    },
    {
        filter: {},
        out: {inline: 1}
    },
    function (err, mapReduced) {
        console.log(mapReduced);
        res.render('result', { title: 'Results', results: mapReduced });
    }
)

}