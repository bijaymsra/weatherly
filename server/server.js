const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); 

const Weather = require('./routes/weather_api');
const verifyUser = require('./routes/verifyUser');
const otpVerify = require('./routes/otpVerify');
const savePassword = require('./routes/savePassword');
const matchPassword = require('./routes/matchPassword');
const verifyCode = require('./routes/verifyCode');
const resetPassword = require('./routes/resetPassword');
const recentFavourite = require('./routes/recentFavourite');
const showUserDetails = require('./routes/showUserDetails');
const aboutSection = require('./routes/aboutSection');
const userInvolvement = require('./routes/userInvolvement');
const dashboard = require('./routes/dashboard');

const app = express();
const port = 5000;

// Middleware for session management
app.use(session({
  secret: 'shiva', // Change to a more secure secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change to true if using HTTPS
}));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));

// Body parser middleware
app.use(bodyParser.json());


// Routes
app.use('/verify', verifyUser);
app.use('/otp-verify', otpVerify);
app.use('/save-password', savePassword);
app.use('/match-password', matchPassword);
app.use('/verify-code', verifyCode);
app.use('/reset-password', resetPassword);
app.use('/weather', Weather);
app.use('/recent',recentFavourite);
app.use('/user',showUserDetails);
app.use('/about',aboutSection);
app.use('/user-involvement',userInvolvement);
app.use('/das',dashboard);



// to get session data to client
app.get('/api/session', (req, res) => {
  if (req.session.name) {
    res.json({ name: req.session.name });
  } 
else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

app.get('/api/sessions', (req, res) => {
if (req.session.email){
    res.json({ email: req.session.email });
  }else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
