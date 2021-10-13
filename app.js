require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const router = require('./routes/index')

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use('/', router);

db.connect(DB_URL, () => {
  app.listen(PORT, () => {
    console.log(`Server running at ${DB_HOST}:${PORT}/`);
  });
});