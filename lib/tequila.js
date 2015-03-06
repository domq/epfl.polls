/**
 * New module.
 */
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

module.exports.strategy = myStrategy;