'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sdk = require('@livepeer/sdk');

var _sdk2 = _interopRequireDefault(_sdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lokka = require('lokka').Lokka;
var Transport = require('lokka-transport-http').Transport;

var client = new Lokka({
  transport: new Transport('https://api.thegraph.com/subgraphs/name/adamsoffer/livepeer-canary')
});

var query = '\n  query User($address: String!) {\n    delegator(first: 1, id: $address) {\n      shares {\n        rewardTokens\n        round {\n          timestamp\n        }\n      }\n    }\n  }\n';

var fetchData = exports.fetchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(address) {
    var sdk, rpc, user, vars, _ref2, delegator;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _sdk2.default)();

          case 2:
            sdk = _context.sent;
            rpc = sdk.rpc;
            _context.next = 6;
            return rpc.getDelegator(address.toLowerCase());

          case 6:
            user = _context.sent;
            vars = {
              address: user.address
            };
            _context.next = 10;
            return client.query(query, vars);

          case 10:
            _ref2 = _context.sent;
            delegator = _ref2.delegator;
            return _context.abrupt('return', (0, _extends3.default)({}, user, delegator));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchData(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=livepeer.js.map