const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { fullName, email, country, age, password, city } = req.body;


  req.session.email = email;
  req.session.password = password;
  req.session.name = fullName;
  const query = 'INSERT INTO users (full_name, email, country, age, password, city) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [fullName , email, country, age, password, city], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving user data.');
    } else {
      res.status(201).send('User data saved successfully.');
    }
  });
});

module.exports = router;
