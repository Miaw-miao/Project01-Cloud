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
        foreignKey: 'author'
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
    like_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};