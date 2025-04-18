const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('my_database', 'root', '211038', {
  host: 'localhost',
  dialect: 'mysql'
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;