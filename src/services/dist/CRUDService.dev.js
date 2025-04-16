"use strict";

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('sequelize'),
    Op = _require.Op;

var createNewCRUD = function createNewCRUD(data) {
  return regeneratorRuntime.async(function createNewCRUD$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function _callee(resolve, reject) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(_index["default"].Blog.create({
                      title: data.title,
                      author: data.author,
                      description: data.description,
                      content: data.content,
                      created_date: data.created_date,
                      last_modified_date: data.last_modified_date,
                      like_number: data.like_number
                    }));

                  case 3:
                    resolve('Create a new blog succeed!');
                    _context.next = 9;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    reject(_context.t0);

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[0, 6]]);
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var createNewUser = function createNewUser(username, password, role) {
  var existingUser, newUser;
  return regeneratorRuntime.async(function createNewUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_index["default"].User.findOne({
            where: {
              username: username
            }
          }));

        case 3:
          existingUser = _context3.sent;

          if (!existingUser) {
            _context3.next = 6;
            break;
          }

          throw new Error('Username already exists');

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(_index["default"].User.create({
            username: username,
            password: password,
            // Nếu bạn muốn mã hóa mật khẩu, bạn cần thêm bước mã hóa ở đây
            role: role
          }));

        case 8:
          newUser = _context3.sent;
          return _context3.abrupt("return", newUser);

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var deleteBlogById = function deleteBlogById(blogId) {
  var blog;
  return regeneratorRuntime.async(function deleteBlogById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_index["default"].Blog.findOne({
            where: {
              id: blogId
            }
          }));

        case 3:
          blog = _context4.sent;

          if (blog) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", "Blog with ID ".concat(blogId, " not found"));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(blog.destroy());

        case 8:
          return _context4.abrupt("return", "Blog with ID ".concat(blogId, " has been deleted successfully"));

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // let getAllBlogs = async (isNewest) => {
//     try {
//         let blogs = await db.Blog.findAll({
//             order: isNewest ? [['id', 'DESC']] : [['id', 'ASC']]
//         });
//         return blogs;
//     } catch (error) {
//         console.error("Error getting blogs:", error);
//         throw error;
//     }
// };


var getAllBlogs = function getAllBlogs(isNewest, limit) {
  var blogs;
  return regeneratorRuntime.async(function getAllBlogs$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_index["default"].Blog.findAll({
            order: isNewest ? [['id', 'DESC']] : [['id', 'ASC']],
            limit: limit || null,
            include: [{
              model: _index["default"].User,
              as: 'authorData',
              attributes: ['username'] // Lấy mỗi username của tác giả

            }]
          }));

        case 3:
          blogs = _context5.sent;
          return _context5.abrupt("return", blogs);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error("Error getting blogs:", _context5.t0);
          throw _context5.t0;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getBlogById = function getBlogById(blogId) {
  return regeneratorRuntime.async(function getBlogById$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise(function _callee2(resolve, reject) {
            var blog;
            return regeneratorRuntime.async(function _callee2$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.prev = 0;

                    if (!blogId) {
                      resolve(null);
                    }

                    _context6.next = 4;
                    return regeneratorRuntime.awrap(_index["default"].Blog.findOne({
                      where: {
                        id: blogId
                      },
                      include: [{
                        model: _index["default"].User,
                        as: 'authorData',
                        attributes: ['username'] // chỉ lấy username, không lấy password, id,...

                      }]
                    }));

                  case 4:
                    blog = _context6.sent;
                    resolve(blog);
                    _context6.next = 11;
                    break;

                  case 8:
                    _context6.prev = 8;
                    _context6.t0 = _context6["catch"](0);
                    reject(_context6.t0);

                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }
            }, null, null, [[0, 8]]);
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var getUserByUsername = function getUserByUsername(username) {
  var user;
  return regeneratorRuntime.async(function getUserByUsername$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_index["default"].User.findOne({
            where: {
              username: username
            }
          }));

        case 3:
          user = _context8.sent;
          return _context8.abrupt("return", user);

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw new Error('Database error: ' + _context8.t0.message);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  createNewCRUD: createNewCRUD,
  deleteBlogById: deleteBlogById,
  getAllBlogs: getAllBlogs,
  getBlogById: getBlogById,
  createNewUser: createNewUser,
  getUserByUsername: getUserByUsername
};