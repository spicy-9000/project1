const express = require('express');
const cors = require('cors');//install cors and express
const fs = require('fs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');// install nodemailer
const crypto = require('crypto');//needs npm intsall crypto
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
  if (err) console.error('DB Error:', err);//gives error
  else console.log(' Connected to MySQL');//else connects
});

app.post('/signin', (req, res) => {//endpath at signin to store post
  const { uname, semail, phone, gender, password } = req.body;
  const sql = "INSERT INTO users (uname, semail, phone, gender, password) VALUES (?, ?, ?, ?, ?)";//inserting details
  db.query(sql, [uname, semail, phone, gender, password], (err, result) => {
    if (err) return res.status(500).send('DB Error: ' + err.message);
    res.send('User registered successfully');//inserts the details into database users from login
  });
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;// if user forgets password

  const checkQuery = "SELECT * FROM users WHERE semail = ?";
  db.query(checkQuery, [email], (err, results) => {//query and email as args
    if (err) return res.status(500).send("DB error");
    if (results.length === 0) return res.status(404).send("User not found");//if no results not matching with the given email at login then gives user is not found 

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
        if (err) {//give if not mail coudlnt be send
          console.error("Mail error:", err);
          return res.status(500).send("Error sending email");
        }
        res.send("Reset link sent to your email.");
      });
    });
  });
});
app.get('/api/plants', (req, res) => {// anothe database regarding palnts which will fetch from the uploads for displaying in home page
  db.query('SELECT * FROM plants', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//  server port
app.listen(4002, () => {
  console.log('🌱 Server running at http://localhost:4002');
});

