const express = require('express');
const router = express.Router();
const db = require('../database'); 

// Endpoint to fetch feedbacks from the database
router.get('/feedbacks', (req, res) => {
    const query = `
        SELECT uf.name, uf.feedback, uf.time_stamp
        FROM users_feedback uf
        JOIN (
            SELECT name, MIN(time_stamp) AS earliest_time
            FROM users_feedback
            GROUP BY name
        ) AS earliest_feedback
        ON uf.name = earliest_feedback.name AND uf.time_stamp = earliest_feedback.earliest_time
        ORDER BY uf.time_stamp DESC
        LIMIT 5;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Failed to fetch feedbacks:', error);
            return res.status(500).json({ error: 'Failed to fetch feedbacks' });
        }
        res.json(results);
    });
});




// Endpoint to fetch top 3 users based on search count from the weather table
router.get('/top-users', (req, res) => {
    const query = `
        SELECT u.full_name AS userName, COUNT(*) AS searchCount 
        FROM weather w
        JOIN users u ON w.email = u.email
        GROUP BY u.full_name
        ORDER BY searchCount DESC 
        LIMIT 3
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Failed to fetch top users:', error);
            return res.status(500).json({ error: 'Failed to fetch top users' });
        }
        res.json(results);
    });
});

module.exports = router;
