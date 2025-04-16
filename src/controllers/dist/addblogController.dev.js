"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAddBlogPage = function getAddBlogPage(req, res) {
  return regeneratorRuntime.async(function getAddBlogPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", res.render('add-blog.ejs', {
            blog: null
          }));

        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).send("Error loading blogs"));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/uploads/'); // Lưu vào thư mục uploads
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname); // Lấy phần mở rộng của file


    var fileName = Date.now() + ext; // Tạo tên file duy nhất

    cb(null, fileName);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}).single('image');

var addBlog = function addBlog(req, res) {
  return regeneratorRuntime.async(function addBlog$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          upload(req, res, function _callee(err) {
            var _req$body, title, description, content, imageDescription, imageUrl, blogData;

            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!err) {
                      _context2.next = 3;
                      break;
                    }

                    console.error(err);
                    return _context2.abrupt("return", res.status(500).json({
                      message: 'Error uploading image.'
                    }));

                  case 3:
                    _req$body = req.body, title = _req$body.title, description = _req$body.description, content = _req$body.content, imageDescription = _req$body.imageDescription;
                    imageUrl = req.file ? "/uploads/".concat(req.file.filename) : null; // Lấy đường dẫn hình ảnh

                    _context2.prev = 5;
                    blogData = {
                      title: title,
                      description: description,
                      content: content,
                      imageUrl: imageUrl,
                      imageDescription: imageDescription,
                      author: req.session.user.id,
                      // Giả sử đã có thông tin user
                      created_date: new Date(),
                      last_modified_date: new Date(),
                      like_number: 0
                    }; // Gọi hàm tạo blog

                    _context2.next = 9;
                    return regeneratorRuntime.awrap(_CRUDService["default"].createNewCRUD(blogData));

                  case 9:
                    return _context2.abrupt("return", res.status(200).json({
                      message: 'Create a new blog succeed!'
                    }));

                  case 12:
                    _context2.prev = 12;
                    _context2.t0 = _context2["catch"](5);
                    console.error(_context2.t0);
                    return _context2.abrupt("return", res.status(500).json({
                      message: 'Error creating blog.'
                    }));

                  case 16:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[5, 12]]);
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  getAddBlogPage: getAddBlogPage,
  addBlog: addBlog
};