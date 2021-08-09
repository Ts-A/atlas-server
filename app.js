require('dotenv').config({ path: 'config/.env' });
require('./config/database');

const express = require('express');
const userRouter = require('./src/apis/userApi');
const pinRouter = require('./src/apis/pinApi');

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Home Page' });
});

app.use('/api/user', userRouter);
app.use('/api/pin', pinRouter);

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(PORT, () => console.log('Server running on PORT 5000'));
