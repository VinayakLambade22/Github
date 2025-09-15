const User = require('../models/user.model');
const Repository = require('../models/repository.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error: ' + error.message }); }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error: ' + error.message }); }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) res.json(user);
    else res.status(404).json({ message: 'User not found' });
  } catch (error) { res.status(500).json({ message: 'Server Error: ' + error.message }); }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            const updatedUser = await user.save();
            res.json({ _id: updatedUser._id, username: updatedUser.username, email: updatedUser.email });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) { res.status(500).json({ message: 'Server Error: ' + error.message }); }
};

exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await Repository.deleteMany({ owner: req.params.id });
            await User.deleteOne({_id: req.params.id});
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) { res.status(500).json({ message: 'Server Error: ' + error.message }); }
};