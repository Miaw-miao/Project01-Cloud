'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, {
        foreignKey: 'author',
        as: 'authorData'
      });
      
    }
  };
  Blog.init({
    title: DataTypes.STRING,
    author: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    content: DataTypes.TEXT,
    created_date: DataTypes.DATE,
    last_modified_date: DataTypes.DATE,
    like_number: DataTypes.INTEGER,
    imageUrl: { // Thêm trường imageUrl để lưu đường dẫn ảnh
      type: DataTypes.STRING,
      allowNull: true, // Cho phép null vì không phải lúc nào cũng có ảnh
    },
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};