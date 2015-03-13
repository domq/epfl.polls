var fs = require("fs");

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "router.js") return;
        var route = require('./' + file);
        var baseUrl = (file === "index.js" ? "" : file.substr(0, file.indexOf('.')));
        app.use('/' + baseUrl, route.router);
    });
};
