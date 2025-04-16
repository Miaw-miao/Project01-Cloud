"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('sequelize'),
    Op = _require.Op;

var getSearchPage = function getSearchPage(req, res) {
  return regeneratorRuntime.async(function getSearchPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", res.render('search.ejs'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var searchBlog = function searchBlog(req, res) {
  var searchTerm, date, searchConditions, blogs, isNewest, recentPosts;
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
            // Nếu đã có điều kiện, thêm AND
            if (Object.keys(searchConditions).length > 0) {
              searchConditions = _defineProperty({}, Op.and, [searchConditions, {
                created_date: _defineProperty({}, Op.eq, new Date(date))
              }]);
            } else {
              // Chỉ lọc theo ngày
              searchConditions.created_date = _defineProperty({}, Op.eq, new Date(date));
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

          if (!(blogs.length === 0)) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.render('pages-404.ejs'));

        case 13:
          // Xác định giá trị isNewest
          isNewest = true;
          _context2.next = 16;
          return regeneratorRuntime.awrap(_CRUDService["default"].getAllBlogs(true, 4));

        case 16:
          recentPosts = _context2.sent;
          return _context2.abrupt("return", res.render('blog-list.ejs', {
            blogs: blogs,
            isNewest: isNewest,
            recentPosts: recentPosts
          }));

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).send("Có lỗi xảy ra trong quá trình tìm kiếm"));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 20]]);
};

module.exports = {
  getSearchPage: getSearchPage,
  searchBlog: searchBlog
};