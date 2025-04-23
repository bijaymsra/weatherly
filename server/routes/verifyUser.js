const express = require('express');
const router = express.Router();
const db = require('../database');
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { email } = req.body;

   // checking if email exist in database already
  const query = 'SELECT id FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {

   // if any error while fetching data from db
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error querying the database.' });
    }

     // if email not found then
    if (results.length === 0) {

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const upsertQuery = `
      INSERT INTO registry (registry_email, otp, expiry_time)
      VALUES (?, ?, CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)
      ON DUPLICATE KEY UPDATE otp = VALUES(otp), time_stamp = CURRENT_TIMESTAMP, expiry_time = CURRENT_TIMESTAMP + INTERVAL 5 MINUTE
    `;

    db.query(upsertQuery, [email,otp], (err) => {
      if (err) {
        console.error('Database upsert error:', err);
        return res.status(500).json({ message: 'Error inserting or updating the database.' });
      }

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '3techsoul@gmail.com',
          pass: 'tcul vobg scke mkuu',
        },
      });

      const mailOptions = {
        from: '3techsoul@gmail.com',
        to: email,
        subject: 'Weatherly Account Verification - OTP Enclosed',
        text: `Dear User,

Welcome to Weatherly! To complete your account setup, please verify your email address by entering the following One-Time Password (OTP):

Your OTP: ${otp}

This code is valid for the next 10 minutes. If you did not initiate this request, please disregard this email.

Thank you for choosing Weatherly!

Best regards,
The Weatherly Team`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email.' });
        }
        res.status(404).json({ message: 'Otp sended. Verify again!' });
      });
    });
  } 
  
  // if email found in database 
  else {
    res.status(200).json({ message: 'Welcome Back' });

  }
});
});


// this is for if password forgot
router.post('/forgot', (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const updateQuery = 'UPDATE registry SET otp = ? WHERE registry_email = ?';
  db.query(updateQuery, [otp, email], (err) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ message: 'Error updating the database.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: '3techsoul@gmail.com',
        pass: 'tcul vobg scke mkuu',
      },
    });

    const mailOptions = {
      from: '3techsoul@gmail.com',
      to: email,
      subject: 'Weatherly Account Password Reset - OTP Enclosed',
      text: `Dear User,

We received a request to reset the password for your Weatherly account. To proceed, please use the following One-Time Password (OTP):

Your OTP: ${otp}

This code is valid for the next 10 minutes. If you did not request a password reset, please ignore this email.

Thank you for using Weatherly!

Best regards,
The Weatherly Team`,
};

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email.' });
      }

      res.status(200).json({ message: 'Kindly check your email.' });
    });
  });


});

module.exports = router;

