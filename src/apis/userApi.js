const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User/userModel');

const { genSaltSync, hashSync, compareSync } = bcrypt;
const { SALT } = process.env;

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });
    if (!user) throw new Error('Invalid User ID');
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:user_id', async (req, res) => {
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
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = req.body.user;
    const user = await User.findOne({ username: userData.username });

    if (!user || !compareSync(userData.password, user.password))
      throw new Error('Invalid Credentials');

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
