//import sequelize datatypes
const { DataTypes } = require("sequelize");
//import the sequelize object we created
const { sequelize } = require("../util/database");

//This is defining a database table for User information
module.exports = {
  User: sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    hashedPass: {
      type: DataTypes.STRING,
    },
  }),
};
