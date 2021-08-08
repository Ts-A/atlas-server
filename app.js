require('dotenv').config({ path: 'config/.env' });
require('./config/database');

const express = require('express');

const app = express();

app.use(express.json());

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Home Page' });
});

app.listen(PORT, () => console.log('Server running on PORT 5000'));
