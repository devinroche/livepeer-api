'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = exports.getUser = exports.client = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _winston = require('./winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redis = require('redis');

require('dotenv').config();

// exposing credentials cuz its the weekend and i dont care
var client = exports.client = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

// not yet implemented
var getUser = exports.getUser = function getUser(address) {
  client.get(address.toLowerCase(), function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, value) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', 0);

            case 4:
              if (!(value === null)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', 1);

            case 8:
              return _context.abrupt('return', JSON.parse(value));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var save = exports.save = function save(address, data) {
  client.set(address, JSON.stringify(data), 'EX', 60 * 60 * 12, function (err) {
    if (err) {
      throw err;
    }
  });
};

client.on('error', function (er) {
  _winston2.default.error(er.stack); // [2]
});
//# sourceMappingURL=cache.js.map