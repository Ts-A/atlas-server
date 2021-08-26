require('dotenv').config({ path: 'config/.env' });
require('./config/database');
require('module-alias/register');

const express = require('express');
const userRouter = require('./src/apis/userApi');
const pinRouter = require('./src/apis/pinApi');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

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
