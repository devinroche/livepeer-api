import { path } from 'app-root-path';
const { createLogger, format, transports } = require('winston');

var options = {
  file: {
    level: 'info',
    filename: `${path}/logs/app.log`,
    handleExceptions: true,
    format: format.simple(),
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var logger = new createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function(message) {
    logger.info(message);
  },
};

export default logger