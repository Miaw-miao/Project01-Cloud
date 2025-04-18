"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));

var _web = _interopRequireDefault(require("./route/web"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import connectDB from "./config/connectDB";
require('dotenv').config();

var app = (0, _express["default"])();
app.use((0, _expressSession["default"])({
  secret: 'userLogin',
  // Khóa bí mật để mã hóa session
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  } // Thiết lập cookie, `secure: true` cần HTTPS

}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  req.user = req.session.user || null; // Gán user từ session nếu có

  next();
});
(0, _viewEngine["default"])(app);
(0, _web["default"])(app); //connectDB();

var port = process.env.PORT || 6969;
app.listen(port, function () {
  console.log("Backend Nodejs is running on the port: " + port);
});