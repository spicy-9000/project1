const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// mysql connection with databse(kitsw)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kitsw'
});

// Fetch all plant data
app.get('/api/plants', (req, res) => {
  db.query('SELECT * FROM plants', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);//error status
  });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4002");
});
