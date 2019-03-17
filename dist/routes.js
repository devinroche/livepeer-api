'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _cache = require('./config/cache');

var _livepeer = require('./config/livepeer');

var _winston = require('./config/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
  router.get('/:address', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var address;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              address = req.params.address.toLowerCase();

              _cache.client.get(address, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, value) {
                  var data;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 6;
                            break;
                          }

                          _winston2.default.error("ERR");
                          res.send(err);
                          throw err;

                        case 6:
                          if (!(value === null)) {
                            _context.next = 15;
                            break;
                          }

                          _winston2.default.info("ADDING USER TO CACHE");
                          _context.next = 10;
                          return (0, _livepeer.fetchData)(address);

                        case 10:
                          data = _context.sent;

                          (0, _cache.save)(address, JSON.stringify(data));
                          res.send(data);
                          _context.next = 17;
                          break;

                        case 15:
                          _winston2.default.info("USER FETCHED FROM CACHE");
                          res.send(JSON.parse(value));

                        case 17:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
//# sourceMappingURL=routes.js.map