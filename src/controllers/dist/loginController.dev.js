"use strict";

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getLoginPage = function getLoginPage(req, res) {
  return regeneratorRuntime.async(function getLoginPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", res.render('pages-login.ejs'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var postLoginPage = function postLoginPage(req, res) {
  var _req$body, username, password, user;

  return regeneratorRuntime.async(function postLoginPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // Lấy thông tin người dùng nhập vào từ form
          // Kiểm tra người dùng tồn tại trong cơ sở dữ liệu

          _context2.next = 4;
          return regeneratorRuntime.awrap(_index["default"].User.findOne({
            where: {
              username: username
            }
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.render('pages-login.ejs', {
            message: 'User not found'
          }));

        case 7:
          if (!(user.password !== password)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.render('pages-login.ejs', {
            message: 'Incorrect password'
          }));

        case 9:
          // Tạo session cho người dùng
          req.session.user = user; // Đăng nhập thành công, chuyển hướng đến trang chủ hoặc dashboard

          return _context2.abrupt("return", res.redirect('/index'));

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.render('pages-login.ejs', {
            message: 'An error occurred, please try again.'
          }));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports = {
  getLoginPage: getLoginPage,
  postLoginPage: postLoginPage
};