'use strict';

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _winston = require('./config/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_cluster2.default.isMaster) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        _cluster2.default.fork();
    }
    _cluster2.default.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died');
        _cluster2.default.fork();
    });
} else {
    var app = (0, _express2.default)();
    var port = process.env.PORT || 8080;
    var router = _express2.default.Router();

    app.use('/api', router);
    app.use((0, _morgan2.default)('combined', { stream: _winston2.default.stream }));
    app.listen(port, function () {
        return console.log('Worker ' + _cluster2.default.worker.id + ' running!');
    });

    (0, _routes2.default)(router);
}
//# sourceMappingURL=index.js.map