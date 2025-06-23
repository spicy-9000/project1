const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kitsw'
});

db.connect(err => {
  if (err) console.error('DB Error:', err);
  else console.log(' Connected to MySQL');
});

app.post('/signin', (req, res) => {
  const { uname, semail, phone, gender, password } = req.body;
  const sql = "INSERT INTO users (uname, semail, phone, gender, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [uname, semail, phone, gender, password], (err, result) => {
    if (err) return res.status(500).send('DB Error: ' + err.message);
    res.send('User registered successfully');
  });
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  const checkQuery = "SELECT * FROM users WHERE semail = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).send("DB error");
    if (results.length === 0) return res.status(404).send("User not found");

    const token = crypto.randomBytes(32).toString("hex");
    const updateQuery = "UPDATE users SET reset_token = ? WHERE semail = ?";
    db.query(updateQuery, [token, email], (err) => {
      if (err) return res.status(500).send("Error saving token");

      const resetLink = `http://localhost:3000/reset-password/${token}`;

      //  Send the reset link via email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "useremail",
          pass: "yourpasskey", 
        },
      });

      const mailOptions = {
        from: "useremail",
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click below to reset your password:</p>
               <a href="${resetLink}">${resetLink}</a>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Mail error:", err);
          return res.status(500).send("Error sending email");
        }
        res.send("Reset link sent to your email.");
      });
    });
  });
});
app.get('/api/plants', (req, res) => {
  db.query('SELECT * FROM plants', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//  server port
app.listen(4002, () => {
  console.log('🌱 Server running at http://localhost:4002');
});

