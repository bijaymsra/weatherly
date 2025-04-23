const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/details', (req, res) => {
  const email = req.session.email; // Get email from session

  if (!email) {
    return res.status(401).json({ message: 'User not authenticated.' });
  }

  const query = `
    SELECT full_name, email, password, age, country, city, time_stamp
    FROM users
    WHERE email = ?;
  `;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No Data Found!' });
    }
    res.json(results[0]);
  });
});


router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed.');
    }
    res.clearCookie('connect.sid'); // Adjust the cookie name if different
    res.send('Logged out successfully.');
  });
});


module.exports = router;
