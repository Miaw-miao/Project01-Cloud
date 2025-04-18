"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getIndexPage = function getIndexPage(req, res) {
  var isNewest, limit, blogs, user;
  return regeneratorRuntime.async(function getIndexPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          isNewest = true;
          limit = 3;
          _context.next = 5;
          return regeneratorRuntime.awrap(_CRUDService["default"].getAllBlogs(isNewest, limit));

        case 5:
          blogs = _context.sent;
          // Lấy thông tin người dùng từ session
          user = req.session.user;
          return _context.abrupt("return", res.render('index.ejs', {
            blogs: blogs,
            user: user
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching blogs:', _context.t0);
          return _context.abrupt("return", res.status(500).send('Server error'));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  getIndexPage: getIndexPage
};