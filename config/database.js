const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Database connected');
});

mongoose.connection.on('error', () => {
  console.log('Error connecting database');
});
