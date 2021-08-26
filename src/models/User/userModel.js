const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    color: {
      type: String,
      required: false,
      default: '#ffffff',
    },
    tokens: [{ type: String, select: false }],
    pins: [
      {
        ref: 'Pin',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
