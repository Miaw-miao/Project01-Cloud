"use strict";

var _express = _interopRequireDefault(require("express"));

var _bloglistController = _interopRequireDefault(require("../controllers/bloglistController"));

var _blogsingleController = _interopRequireDefault(require("../controllers/blogsingleController"));

var _indexController = _interopRequireDefault(require("../controllers/indexController"));

var _pages404Controller = _interopRequireDefault(require("../controllers/pages404Controller"));

var _loginController = _interopRequireDefault(require("../controllers/loginController"));

var _signupController = _interopRequireDefault(require("../controllers/signupController"));

var _searchController = _interopRequireDefault(require("../controllers/searchController"));

var _addblogController = _interopRequireDefault(require("../controllers/addblogController"));

var _editblogController = _interopRequireDefault(require("../controllers/editblogController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var initWebRoutes = function initWebRoutes(app) {
  router.get('/', function (req, res) {
    res.redirect('/login');
  });
  router.get('/blog-list', _bloglistController["default"].getBlogListPage);
  router.get('/blog-single', _blogsingleController["default"].getBlogSinglePage);
  router["delete"]('/blog/:id', _blogsingleController["default"].deleteBlog);
  router.get('/search', _searchController["default"].getSearchPage);
  router.get('/search/results', _searchController["default"].searchBlog);
  router.get('/pages-404', _pages404Controller["default"].get404Page);
  router.get('/index', _indexController["default"].getIndexPage);
  router.get('/login', _loginController["default"].getLoginPage);
  router.post('/login', _loginController["default"].postLoginPage);
  router.get('/signup', _signupController["default"].getSignUpPage);
  router.post('/signup', _signupController["default"].createUser);
  router.get('/add-blog', _addblogController["default"].getAddBlogPage);
  router.post('/add-blog', _addblogController["default"].addBlog);
  router.get('/edit-blog', _editblogController["default"].getEditBlogPage); // Hiển thị form edit blog

  router.post('/edit-blog', _editblogController["default"].editBlogById); // Cập nhật dữ liệu blog

  return app.use("/", router);
};

module.exports = initWebRoutes;