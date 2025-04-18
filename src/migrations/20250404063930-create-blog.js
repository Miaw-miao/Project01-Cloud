'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'             
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      description: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      created_date: {
        type: Sequelize.DATE
      },
      last_modified_date: {
        type: Sequelize.DATE
      },
      like_number: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING,  // Định dạng chuỗi để lưu đường dẫn ảnh
        allowNull: true  // Cho phép null vì không phải lúc nào cũng có ảnh
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Blogs');
  }
};