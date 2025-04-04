'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Blogs', [
      {
        title: 'Giới thiệu Sequelize',
        author: 1, // AdminA
        description: 'Bài viết này giới thiệu ORM Sequelize trong Node.js.',
        content: 'Sequelize là một ORM mạnh mẽ cho Node.js hỗ trợ nhiều CSDL như PostgreSQL, MySQL...',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hướng dẫn Migration và Seeder',
        author: 2, // AdminB
        description: 'Chi tiết cách tạo migration và seeder với sequelize-cli.',
        content: 'Bạn có thể tạo bảng bằng lệnh sequelize-cli và thêm dữ liệu mẫu với seeders...',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Tạo khóa ngoại trong Sequelize',
        author: 1, // GuestA
        description: 'Bài viết mô tả cách liên kết bảng bằng foreign key trong Sequelize.',
        content: 'Sử dụng references để liên kết bảng Users với Blogs qua author...',
        created_date: new Date(),
        last_modified_date: new Date(),
        like_number: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Blogs', {
      title: ['Giới thiệu Sequelize', 'Hướng dẫn Migration và Seeder', 'Tạo khóa ngoại trong Sequelize']
    }, {});
  }
};
