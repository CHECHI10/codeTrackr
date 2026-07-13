const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(req, res) {
  try {
    const { username, email, password, } = req.body;

    const existingUser = await userModel.findOne({ 
      $or: [
        {username},
        {email}
      ] 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ 
      username, email, password:hash 
    });

    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET);

    res.cookie('token', token);

    
    res.status(201).json({ 
      message: "User registered successfully",
      user 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  registerUser
};