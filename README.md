# Weatherly - "A Dynamic weather Forecasting Web Application"
Weatherly is a weather forecast web application designed to provide users with detailed weather information in a dynamic, interactive, and visually appealing way. The application uses React for the frontend, Node.js for the backend, and MySQL as the database.

# Features
1. City-Based Weather Search: Users can search for any city, and Weatherly will display the temperature, weather conditions, humidity, and a dynamic map showing the city.
2. Dynamic Map: Each city search is accompanied by a live map displaying the location.
3. Search History: The application stores every search, allowing users to view their search history. The most searched city is highlighted as the favorite city.
4. Dashboard: Personalized dashboard displaying:
  4.1 Weather details for the user’s city.
  4.2 Top 3 users who have searched the most.
  4.3 Dynamic user feedback messages.
5. Dark Mode: Users can switch between light and dark modes for a better user experience.
6. User Interaction & Responsiveness: The application is designed to be user-friendly with smooth navigation and interactive elements.
7. User Authentication via otp sended to the users gmail account, for secure and valid user enrolment in weatherly application.
8. Logout and About Sections: A navigation bar for easy access to the logout feature, about page, and additional information about Weatherly.

# Technology Stack
1. Frontend: React.js
2. Backend: Node.js with Express
3. Database: MySQL

# Project Structure
weatherly/
│
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
├── database/               # MySQL database scripts
│   └── schema.sql
│
├── README.md
└── package.json

# How It Works
1. Weather Search: Enter a city name, and the app will fetch and display weather details including temperature, condition, humidity, and a map.
2. Search History & Favorite City: View all previous searches and identify the most searched city as the favorite.
3. User Dashboard: Get a personalized weather overview along with top user stats and recent feedback.
4. User Feedback: Dynamic feedback displayed based on user submissions.

# Installation and Setup
Clone the repository:
git clone https://github.com/bijaymsra/weatherly.git

# Navigate to the project directory and install dependencies for both client and server:
cd weatherly/client
npm install
cd ../server
npm install

# Set up the MySQL database using the provided schema in database/schema.sql.
Start the server and client:
cd weatherly/server
node server.js
cd ../client
npm start


# Contributing
Feel free to fork this repository, create a new branch, and submit a pull request.

# License
This project is licensed under the MIT License.




