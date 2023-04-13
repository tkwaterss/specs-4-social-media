require("dotenv").config();

//Need to remember to always destructure models
const {User} = require("../models/user");

//importing jwt and bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//destructuring the secret to use for authentication
const { SECRET } = process.env;

//This functino creates a new token for the user when called
const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, res) => {
    try {
      //destructuring the recieved registration credentials
      const { username, password } = req.body;
      //boolean variable for if user already exists or not
      const foundUser = await User.findOne({ where: { username } });

      //if user exists, can't register
      if (foundUser) {
        res.status(400).send('username already exists');
      } else {
        //creates bcrypt salt for generating a hash
        const salt = bcrypt.genSaltSync(10);
        //combines the salt and password, hash is the encypted password
        const hash = bcrypt.hashSync(password, salt);
        //create a new user using the given username and hashed password
        //will be saved to the database before continuing
        const newUser = await User.create({
          username: username,
          hashedPass: hash,
        });
        //create a new token by calling the previously created function
        //pass in the newly created user information
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );

        //setting the expiration timer
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        
        //return all the information to the client
        res.status(201).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        });
      }
    } catch (err) {
      console.log("Error in resgister");
      console.log(err);
      res.sendStatus(400);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(201).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token: token,
            exp: exp,
          });
        } else {
          res.status(400).send("Not Able to Authenticate");
        }
      } else {
        res.status(400).send("Unable to Log In");
      }
    } catch (err) {
      console.log("Error in resgister");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
