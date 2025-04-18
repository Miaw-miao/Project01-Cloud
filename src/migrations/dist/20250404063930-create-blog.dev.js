'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('Blogs', {
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
                type: Sequelize.STRING,
                // Định dạng chuỗi để lưu đường dẫn ảnh
                allowNull: true // Cho phép null vì không phải lúc nào cũng có ảnh

              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('Blogs'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};