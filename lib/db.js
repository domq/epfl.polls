var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "pollsAnswer"];
var db = require("mongojs").connect(databaseUrl, collections);

module.exports = db;
