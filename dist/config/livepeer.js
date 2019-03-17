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

var _lokka = require('lokka');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _lokkaTransportHttp = require('lokka-transport-http');

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _lokka.Lokka({
  transport: new _lokkaTransportHttp.Transport('https://api.thegraph.com/subgraphs/name/adamsoffer/livepeer-canary')
});

var query = '\n  query User($address: String!) {\n    delegator(first: 1, id: $address) {\n      shares {\n        rewardTokens\n        round {\n          timestamp\n        }\n      }\n    }\n  }\n';

var fetchData = exports.fetchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(address) {
    var sdk, rpc, user_req, qraph_req, price_req, results, user, delegator, _ref2, price;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _sdk2.default)();

          case 2:
            sdk = _context.sent;
            rpc = sdk.rpc;
            user_req = rpc.getDelegator(address.toLowerCase());
            qraph_req = client.query(query, {
              address: address.toLowerCase()
            });
            price_req = (0, _nodeFetch2.default)("https://api.cryptonator.com/api/ticker/lpt-usd");
            _context.next = 9;
            return _promise2.default.all([user_req, qraph_req, price_req]);

          case 9:
            results = _context.sent;
            user = results[0];
            delegator = results[1].delegator;
            _context.next = 14;
            return results[2].json();

          case 14:
            _ref2 = _context.sent;
            price = _ref2.ticker.price;
            return _context.abrupt('return', (0, _extends3.default)({}, user, delegator, { price: price }));

          case 17:
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