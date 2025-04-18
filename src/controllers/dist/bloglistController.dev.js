"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getBlogListPage = function getBlogListPage(req, res) {
  var isNewest, blogs, recentPosts, user;
  return regeneratorRuntime.async(function getBlogListPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          isNewest = req.query.isNewest === undefined || req.query.isNewest === 'true';
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_CRUDService["default"].getAllBlogs(isNewest));

        case 4:
          blogs = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_CRUDService["default"].getAllBlogs(true, 4));

        case 7:
          recentPosts = _context.sent;
          // Lấy user trực tiếp từ session
          user = req.session.user;
          return _context.abrupt("return", res.render('blog-list.ejs', {
            blogs: blogs,
            isNewest: isNewest,
            recentPosts: recentPosts,
            user: user
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).send("Error loading blogs"));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var getIndexPage = function getIndexPage(req, res) {
  var recentPosts;
  return regeneratorRuntime.async(function getIndexPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_CRUDService["default"].getAllBlogs(true, 4));

        case 3:
          recentPosts = _context2.sent;
          return _context2.abrupt("return", res.render('index.ejs', {
            recentPosts: recentPosts
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching recent posts:', _context2.t0);
          return _context2.abrupt("return", res.status(500).send('Server error'));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  getBlogListPage: getBlogListPage,
  getIndexPage: getIndexPage
};