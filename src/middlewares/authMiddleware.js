const jwt = require('jsonwebtoken');
const User = require('@models/User/userModel.js');

const { JWT_SECRET_KEY } = process.env;

const authUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const verifiedToken = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findOne({ _id: verifiedToken.userToken })
      .select('tokens username email')
      .exec();

    if (!user || !user.tokens.find((tokenID) => tokenID === token))
      throw new Error('Auth token expired. Login again');

    res.user = user;
    res.token = token;

    next();
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

module.exports = authUser;
