"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('sequelize'),
    Op = _require.Op;

var getSearchPage = function getSearchPage(req, res) {
  var user;
  return regeneratorRuntime.async(function getSearchPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.session.user || null;
          return _context.abrupt("return", res.render('search.ejs', {
            user: user
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

var searchBlog = function searchBlog(req, res) {
  var searchTerm, date, searchConditions, startOfDay, endOfDay, blogs, user, isNewest, recentPosts;
  return regeneratorRuntime.async(function searchBlog$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          searchTerm = req.query.searchTerm;
          date = req.query.date;

          if (!(!searchTerm && !date)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.render('search.ejs', {
            blogs: [],
            message: 'Please enter a search term or a date'
          }));

        case 4:
          _context2.prev = 4;
          searchConditions = {};

          if (searchTerm) {
            searchConditions[Op.or] = [{
              title: _defineProperty({}, Op.like, "%".concat(searchTerm, "%"))
            }, {
              description: _defineProperty({}, Op.like, "%".concat(searchTerm, "%"))
            }];
          } // Nếu có date


          if (date) {
            startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0); // Đặt thời gian đầu ngày

            endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999); // Đặt thời gian cuối ngày

            if (Object.keys(searchConditions).length > 0) {
              searchConditions = _defineProperty({}, Op.and, [searchConditions, {
                created_date: _defineProperty({}, Op.between, [startOfDay, endOfDay])
              }]);
            } else {
              searchConditions.created_date = _defineProperty({}, Op.between, [startOfDay, endOfDay]);
            }
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(_index["default"].Blog.findAll({
            where: searchConditions,
            include: [{
              model: _index["default"].User,
              as: 'authorData',
              attributes: ['username']
            }]
          }));

        case 10:
          blogs = _context2.sent;
          user = req.session.user || null;

          if (!(blogs.length === 0)) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.render('pages-404.ejs', {
            user: user
          }));

        case 14:
          // Xác định giá trị isNewest
          isNewest = true;
          _context2.next = 17;
          return regeneratorRuntime.awrap(_CRUDService["default"].getAllBlogs(true, 4));

        case 17:
          recentPosts = _context2.sent;
          return _context2.abrupt("return", res.render('blog-list.ejs', {
            blogs: blogs,
            isNewest: isNewest,
            recentPosts: recentPosts,
            user: user
          }));

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).send("Có lỗi xảy ra trong quá trình tìm kiếm"));

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 21]]);
};

module.exports = {
  getSearchPage: getSearchPage,
  searchBlog: searchBlog
};