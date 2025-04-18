"use strict";

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var get404Page = function get404Page(req, res) {
  var user;
  return regeneratorRuntime.async(function get404Page$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.session.user || null;
          return _context.abrupt("return", res.render('pages-404.ejs', {
            user: user
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  get404Page: get404Page
};