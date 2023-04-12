//import sequelize datatypes
const { DataTypes } = require("sequelize");
//import the sequelize object we created
const { sequelize } = require("../util/database");

//This is defining a database table for user post information
module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    privateStatus: { type: DataTypes.BOOLEAN },
  }),
};
