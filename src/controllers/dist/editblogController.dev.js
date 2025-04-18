"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _CRUDService = _interopRequireDefault(require("../services/CRUDService"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getEditBlogPage = function getEditBlogPage(req, res) {
  var blogId, user, blog;
  return regeneratorRuntime.async(function getEditBlogPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          blogId = req.query.id;
          user = req.session.user || null;

          if (blogId) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Blog ID is required"));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_index["default"].Blog.findOne({
            where: {
              id: blogId
            }
          }));

        case 7:
          blog = _context.sent;

          if (blog) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(404).send("Blog not found"));

        case 10:
          return _context.abrupt("return", res.render('add-blog.ejs', {
            blog: blog,
            user: user
          }));

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).send("Error loading blogs"));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'src/public/uploads/'); // Lưu vào thư mục uploads
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname); // Lấy phần mở rộng của file


    var fileName = Date.now() + ext; // Tạo tên file duy nhất

    cb(null, fileName);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}).single('image'); // let editBlogById = async (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Error uploading image.' });
//         }
//         console.log('req.body:', req.body);
//         console.log('req.file:', req.file);
//         const { id, title, description, content } = req.body;
//         // Kiểm tra dữ liệu
//         if (!id || !title || !description || !content) {
//             return res.status(400).json({ message: 'All fields are required!' });
//         }
//         // Cập nhật thông tin blog
//         const blogData = {
//             title,
//             description,
//             content,
//             last_modified_date: new Date(),
//         };
//         // Nếu có ảnh mới được upload
//         if (req.file) {
//             blogData.imageUrl = `/uploads/${req.file.filename}`;
//         }
//         try {
//             // Cập nhật blog trong cơ sở dữ liệu
//             const updatedRows = await db.Blog.update(blogData, { where: { id } });
//             if (updatedRows[0] === 0) {
//                 return res.status(404).json({ message: 'Blog not found!' });
//             }
//             return res.status(200).json({
//                 message: 'Blog updated successfully!',
//                 redirectUrl: `/blog-single?id=${id}`, // Chuyển hướng frontend
//             });
//         } catch (err) {
//             console.error('Error updating blog:', err);
//             return res.status(500).json({ message: 'Error updating blog' });
//         }
//     });
// };

var editBlogById = function editBlogById(req, res) {
  return regeneratorRuntime.async(function editBlogById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          upload(req, res, function _callee(err) {
            var _req$body, id, title, description, content, oldBlog, blogData, imageName, oldImagePath, updatedRows;

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
                    _req$body = req.body, id = _req$body.id, title = _req$body.title, description = _req$body.description, content = _req$body.content;

                    if (!(!id || !title || !description || !content)) {
                      _context2.next = 6;
                      break;
                    }

                    return _context2.abrupt("return", res.status(400).json({
                      message: 'All fields are required!'
                    }));

                  case 6:
                    _context2.prev = 6;
                    _context2.next = 9;
                    return regeneratorRuntime.awrap(_index["default"].Blog.findOne({
                      where: {
                        id: id
                      }
                    }));

                  case 9:
                    oldBlog = _context2.sent;

                    if (oldBlog) {
                      _context2.next = 12;
                      break;
                    }

                    return _context2.abrupt("return", res.status(404).json({
                      message: 'Blog not found!'
                    }));

                  case 12:
                    _context2.next = 18;
                    break;

                  case 14:
                    _context2.prev = 14;
                    _context2.t0 = _context2["catch"](6);
                    console.error('Error fetching blog:', _context2.t0);
                    return _context2.abrupt("return", res.status(500).json({
                      message: 'Error fetching blog'
                    }));

                  case 18:
                    // Tạo object chứa dữ liệu cần cập nhật
                    blogData = {
                      title: title,
                      description: description,
                      content: content,
                      last_modified_date: new Date()
                    }; // Nếu có ảnh mới thì xóa ảnh cũ và cập nhật đường dẫn mới

                    if (req.file) {
                      imageName = _path["default"].basename(oldBlog.imageUrl); // lấy tên file

                      oldImagePath = _path["default"].join(__dirname, '..', 'public', 'uploads', imageName);

                      if (_fs["default"].existsSync(oldImagePath)) {
                        _fs["default"].unlink(oldImagePath, function (err) {
                          if (err) {
                            console.error('Error can not delete image:', err);
                          } else {
                            console.log('Old image had been deleted:', imageName);
                          }
                        });
                      }

                      blogData.imageUrl = "/uploads/".concat(req.file.filename);
                    }

                    _context2.prev = 20;
                    _context2.next = 23;
                    return regeneratorRuntime.awrap(_index["default"].Blog.update(blogData, {
                      where: {
                        id: id
                      }
                    }));

                  case 23:
                    updatedRows = _context2.sent;

                    if (!(updatedRows[0] === 0)) {
                      _context2.next = 26;
                      break;
                    }

                    return _context2.abrupt("return", res.status(404).json({
                      message: 'Blog not found!'
                    }));

                  case 26:
                    return _context2.abrupt("return", res.status(200).json({
                      message: 'Blog updated successfully!',
                      redirectUrl: "/blog-single?id=".concat(id)
                    }));

                  case 29:
                    _context2.prev = 29;
                    _context2.t1 = _context2["catch"](20);
                    console.error('Error updating blog:', _context2.t1);
                    return _context2.abrupt("return", res.status(500).json({
                      message: 'Error updating blog'
                    }));

                  case 33:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[6, 14], [20, 29]]);
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  getEditBlogPage: getEditBlogPage,
  editBlogById: editBlogById
};