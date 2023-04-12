//import and config the .env file for access to port and secret
//import json web token and destructure secret from .env
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    //pull token off of header from incoming request
    const headerToken = req.get("Authorization");

    //if no token then throw error
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    //token is true or false
    let token;

    //set token to the validation of it with the SECRET (true if matches)
    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    //if false throw error
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    //if true continue to request function
    next();
  },
};
