const mongoose = require('mongoose');

const PinSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Pin = mongoose.model('Pin', PinSchema);

module.exports = Pin;
