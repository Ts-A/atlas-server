require('dotenv').config({ path: './config' });
const express = require('express');

const app = express();

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Home Page' });
});

app.listen(PORT, () => console.log('Server running on PORT 5000'));
