const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/city', (req, res) => {
    const email = req.session.email; // Get email from session


    if (!email) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }


    const query = `
      SELECT city, COUNT(city) AS count
      FROM weather
      WHERE email = ?
      GROUP BY city
      ORDER BY count DESC
      LIMIT 1;
    `;
    
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No cities found for this user' });
      }
      res.json(results[0]);

    });
});


router.get('/search', (req, res) => {

    const email = req.session.email; // Get email from session

    if (!email) {
        return res.status(401).json({ message: 'User not authenticated.' });
    }

    const query = `
    SELECT city, visibility, temperature, \`condition\`, humidity, time_stamp
    FROM weather
    WHERE email = ?
    ORDER BY time_stamp DESC;
  `;
  
    
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No recent searches found for this user' });
      }
      res.json(results);
    });
});

module.exports = router;
