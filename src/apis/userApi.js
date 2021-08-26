const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User/userModel');
const authUser = require('@middlewares/authMiddleware');

const { genSaltSync, hashSync, compareSync } = bcrypt;
const { SALT, JWT_SECRET_KEY } = process.env;

const generateToken = (user) => {
  const userToken = `${user._id}`;
  const token = jwt.sign({ userToken }, JWT_SECRET_KEY);
  return token;
};

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:user_id', authUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });
    if (!user) throw new Error('Invalid User ID');
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:user_id', authUser, async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.user_id });
    if (!user) throw new Error('Invalid User ID');
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const userData = req.body.user;
    const user = new User(userData);

    const salt = genSaltSync(8);
    const hash = hashSync(userData.password, salt);
    user.password = hash;

    const token = generateToken(user);
    user.tokens.push(token);

    await user.save();

    res.status(200).json({ user_id: user._id, token: `Bearer ${token}` });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = req.body.user;
    const user = await User.findOne({ username: userData.username }).select(
      'username email password tokens'
    );

    if (!user || !compareSync(userData.password, user.password))
      throw new Error('Invalid Credentials');

    const token = generateToken(user);
    user.tokens.push(token);
    await user.save();

    res.status(200).json({ user_id: user._id, token: `Bearer ${token}` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/logout', authUser, async (req, res) => {
  try {
    const { user, token } = res;

    user.tokens = user.tokens.filter((token) => token !== token);
    await user.save();

    res.json({ message: 'Logged out' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
