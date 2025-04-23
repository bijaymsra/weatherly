const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { name, currentAddress, contactNo, feedback } = req.body;
  const email = req.session.email;

  const query = 'INSERT INTO users_feedback (email, name, current_address, contact_no, feedback) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [email, name, currentAddress, contactNo, feedback], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving feedback.');
    } else {
      res.status(201).send('Feedback saved successfully.');
    }
  });
});

module.exports = router;
