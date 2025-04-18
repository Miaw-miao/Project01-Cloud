'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('sequelize'),
    Model = _require.Model;

module.exports = function (sequelize, DataTypes) {
  var Blog =
  /*#__PURE__*/
  function (_Model) {
    _inherits(Blog, _Model);

    function Blog() {
      _classCallCheck(this, Blog);

      return _possibleConstructorReturn(this, _getPrototypeOf(Blog).apply(this, arguments));
    }

    _createClass(Blog, null, [{
      key: "associate",

      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      value: function associate(models) {
        // define association here
        Blog.belongsTo(models.User, {
          foreignKey: 'author',
          as: 'authorData'
        });
      }
    }]);

    return Blog;
  }(Model);

  ;
  Blog.init({
    title: DataTypes.STRING,
    author: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    content: DataTypes.TEXT,
    created_date: DataTypes.DATE,
    last_modified_date: DataTypes.DATE,
    like_number: DataTypes.INTEGER,
    imageUrl: {
      // Thêm trường imageUrl để lưu đường dẫn ảnh
      type: DataTypes.STRING,
      allowNull: true // Cho phép null vì không phải lúc nào cũng có ảnh

    }
  }, {
    sequelize: sequelize,
    modelName: 'Blog'
  });
  return Blog;
};