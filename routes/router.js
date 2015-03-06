var fs = require("fs");

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "router.js") return;
        var name = (file === "index.js" ? "" : file.substr(0, file.indexOf('.')));
        var route = require('./' + name);
        app.use('/' + name, route.router);
    });
}

