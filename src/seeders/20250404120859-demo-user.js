'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'AdminA',
        role: 'Admin',
        password: 'admin123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'AdminB',
        role: 'Admin',
        password: 'admin123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'GuestA',
        role: 'Guest',
        password: 'guest123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'GuestB',
        role: 'Guest',
        password: 'guest123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'GuestC',
        role: 'Guest',
        password: 'guest123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      username: ['AdminA', 'AdminB', 'GuestA', 'GuestB', 'GuestC']
    }, {});
  }
};
