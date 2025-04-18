"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getBlogSinglePage = function getBlogSinglePage(req, res) {
  var blogId, blog, user;
  return regeneratorRuntime.async(function getBlogSinglePage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          blogId = req.query.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(_CRUDService["default"].getBlogById(blogId));

        case 4:
          blog = _context.sent;

          if (blog) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).send('Blog not found'));

        case 7:
          user = req.session.user; // TRUYỀN user vào render

          return _context.abrupt("return", res.render('blog-single.ejs', {
            blog: blog,
            user: user
          }));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).send('Server error'));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var deleteBlog = function deleteBlog(req, res) {
  var blogId, currentUser, blog;
  return regeneratorRuntime.async(function deleteBlog$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          blogId = req.params.id;
          currentUser = req.session.user;
          _context2.next = 5;
          return regeneratorRuntime.awrap(_index["default"].Blog.findOne({
            where: {
              id: blogId
            }
          }));

        case 5:
          blog = _context2.sent;

          if (blog) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Blog not found'
          }));

        case 8:
          if (!(blog.author !== currentUser.id)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(403).json({
            message: 'Permission deny'
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(_CRUDService["default"].deleteBlogById(blogId));

        case 12:
          return _context2.abrupt("return", res.status(200).json({
            message: 'Deleted successfully'
          }));

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: 'Delete failed',
            error: _context2.t0
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  getBlogSinglePage: getBlogSinglePage,
  deleteBlog: deleteBlog
};