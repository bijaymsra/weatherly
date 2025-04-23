const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { email, code } = req.body;

  const query = 'SELECT * FROM registry WHERE registry_email = ? AND otp = ?';
  db.query(query, [email, code], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error querying the database.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Get Another Otp? Click Regenerate!' });
    }

    res.status(200).json({ message: 'Code verified. Redirecting to home page.' });
  });
});

module.exports = router;
