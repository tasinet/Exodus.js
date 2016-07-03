var Exodus = require('../Exodus')();

module.exports = function(req, res) {
    var Exod = Exodus.LOAD(req, res);
    var functions = [
        function one() {
            var data = 'first function';
            return data;
        },
        function two() {
            var data = 'second function';
            return new Promise(function(resolve) {
                setTimeout(function() {
                    return resolve(data);
                }, 3000);
            })
        },
        function three() {
            var data = 'third function';
            return data;
        }
    ];
    var renderPayload = function(results) {
        var ejsVars = {
            data: results
        };
        Exod.renderClient(process.cwd() +'/views/app.ejs', ejsVars);
    };
    Exod.runFunction(functions).async(renderPayload);
}