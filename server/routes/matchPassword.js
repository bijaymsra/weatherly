const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error querying the database.' });
    }

    if (results.length === 0) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];

    if (password === user.password) {
      // Storing in session to use in other pages.
      req.session.email = email;
      req.session.password = password;

      // Finding full name of user
      const findName = 'SELECT full_name FROM users WHERE email = ?';
      db.query(findName, [email], (err, results) => {
        if (err) {
          console.error('Database fetching full_name query error:', err);
          return res.status(500).json({ message: 'Error querying the database.' });
        }
        if (results.length === 0) {
          console.log('No name found with email:', email);
          return res.status(401).json({ message: 'Invalid email or password.' });
        } else {
          const fullName = results[0].full_name; // Access the full_name value correctly
          req.session.name = fullName;

          console.log('Login successful for email:', email);
          console.log('Session after login:', req.session);

          // Send response after setting the session values
          return res.status(200).json({ message: 'Login successful.', fullName });
        }
      });
    } else {
      console.log('Incorrect password for email:', email);
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  });
});

module.exports = router;
