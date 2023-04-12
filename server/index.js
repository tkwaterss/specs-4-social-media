require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { PORT } = process.env;

//pulling in all of our end points
const { login, register } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { isAuthenticated } = require("./middleware/isAuthenticated");

//pulling in sequelize and our tables that we created
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

//declaring the table relations
User.hasMany(Post);
Post.belongsTo(User);

const app = express();

//server is going to use json to talk
app.use(express.json());

//
app.use(cors());

app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

//syncing sequelize to our server on startup
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
  })
  .catch((err) => console.log(err));
