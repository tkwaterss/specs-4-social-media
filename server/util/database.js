require('dotenv').config();

//pull in the database connection string and sequelize
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize').Sequelize;

//create a new sequelize object from the class
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
//export the sequelize object to be used
module.exports = {
    sequelize
}