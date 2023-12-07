const express = require("express");

const router = express.Router();

const User = require("../models/userModel");

// logic for register
router.post("/register", async (req, res) => {
  try {
    console.log("inside register api 1");
    const { name, email, password } = req.body;
    const userChecked = await User.findOne({ email });
    if (userChecked) {
      res.status(400).json("user already exist");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });
      console.log(user);
      console.log("inside register >>> api");
      if (user) {
        res.status(200).json({
          id: user.id,
          user: user.name,
          email: user.email,
          password: user.password,
        });
      } else {
        res.status(400).json("cannot register");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//logic for login
router.post("/login", async (req, res) => {
  console.log("inside login api");
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email, password });
    if (userCheck) {
      console.log("inside login api 2 >>>>>>>>");
      console.log(userCheck);
      const temp = {
        _id: userCheck._id,
        name: userCheck.name,
        email: userCheck.email,
        isAdmin: userCheck.isAdmin,
      };
      res.send(temp).status(200)
    } else {
      res.status(404).json("can not find user");
    }
  } catch (error) {
    res.status(500).json({ message: "user does not exist" });
    console.log(error);
  }
});

//logic for getting all registered users
router.get('/get-all-users', async (rew, res) => {
  try {
    console.log('inside get all users api');
    const users = await User.find()
    console.log(users);
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
    console.log(error);
  }
})

module.exports = router;
