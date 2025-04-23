const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
  db.query(updateQuery, [password, email], (err, result) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ message: 'Error updating password.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    res.status(200).json({ message: 'Password updated successfully.' });
  });
});

module.exports = router;
