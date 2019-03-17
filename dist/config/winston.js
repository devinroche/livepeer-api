'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appRootPath = require('app-root-path');

var _require = require('winston'),
    createLogger = _require.createLogger,
    format = _require.format,
    transports = _require.transports;

var options = {
  file: {
    level: 'info',
    filename: _appRootPath.path + '/logs/app.log',
    handleExceptions: true,
    format: format.simple(),
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

var logger = new createLogger({
  transports: [new transports.File(options.file), new transports.Console(options.console)],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: function write(message) {
    logger.info(message);
  }
};

exports.default = logger;
//# sourceMappingURL=winston.js.map