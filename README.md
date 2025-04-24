# 🌦️ Weatherly - A Dynamic Weather Forecasting Web Application

Weatherly is a modern weather forecast web application built to deliver accurate, real-time weather information in a dynamic and visually engaging manner. Designed for intuitive interaction and personalized experiences, Weatherly leverages a powerful tech stack to provide detailed forecasts, dynamic maps, and a personalized dashboard.

## 🚀 Features

1. 🌍 City-Based Weather Search
- Search for any city and view live temperature, humidity, weather conditions, and a dynamic map of the location.

2. 🗺️ Dynamic Map Integration
- Instantly visualize the searched city on an interactive map.

3. 🕘 Search History & Favorite City
- Tracks your search history and highlights the most searched city as your favorite.

4. 📊 Personalized Dashboard
Displays:

- Real-time weather for your current city

- Top 3 users with the highest number of searches

- Dynamic user feedback messages

5. 🌙 Dark Mode Support

- Seamlessly toggle between light and dark modes for enhanced UX.

6. 📱 Interactive & Responsive UI
- Smooth navigation and an intuitive interface for users on all devices.

7. 📧 OTP-Based User Authentication
- Secure login and sign-up using Gmail-based OTP verification.

9. ℹ️ Logout & About Sections
- Easy access to app information and session control via a top navigation bar.

10. 🧰 Tech Stack
- Frontend: React.js

- Backend: Node.js with Express

- Database: MySQL

---

## 🗂️ Project Structure

```
weatherly/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── database/            # MySQL schema and setup
│   └── schema.sql
├── README.md
└── package.json
```
---

## ⚙️ How It Works
1. Search Weather:

- Type in a city name to retrieve current weather data and a city map.

2. Track Search History:

- Every search is saved, and the most frequent city is shown as your favorite.

3. User Dashboard:

- Displays personalized data, top users, and interactive feedback.

4. User Feedback:

- Real-time feedback dynamically shown based on user actions.

---

## 🛠️ Installation & Setup

```Bash
1️⃣ Clone the Repository:
git clone https://github.com/bijaymsra/weatherly.git
cd weatherly

2️⃣ Install Dependencies:
cd client
npm install

cd server
npm install

3️⃣ Set Up the MySQL Database:

- Create the database:
  mysql -u root -p
  CREATE DATABASE weatherly;
  USE weatherly;

- You can run the schema manually:

-- Create 'users' table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR(100) DEFAULT NULL
);

-- Create 'registry' table
CREATE TABLE registry (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    registry_email VARCHAR(255) UNIQUE DEFAULT NULL,
    otp VARCHAR(6) NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL 5 MINUTE
);

-- Create 'weather' table
CREATE TABLE weather (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    visibility DOUBLE DEFAULT NULL,
    latitude DECIMAL(8,6) DEFAULT NULL,
    longitude DECIMAL(9,6) DEFAULT NULL,
    temperature DECIMAL(5,2) DEFAULT NULL,
    humidity DECIMAL(5,2) DEFAULT NULL,
    condition VARCHAR(100) DEFAULT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'users_feedback' table
CREATE TABLE users_feedback (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    current_address VARCHAR(255) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    feedback TEXT NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4️⃣ Start the Application:

## Start Backend
cd weatherly/server
node server.js

## Start Frontend
cd ../client
npm run dev


```

---

## 🤝 Contributing

- Contributions are welcome! Feel free to:
- Fork the repository
- Create a new branch
- Submit a pull request with your enhancements

---

## ✍️ Author

**Bijay M S R A**  
[GitHub Profile](https://github.com/bijaymsra)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📸 Optional Additions

Want to improve this README further? Consider adding:

- 🧱 **Architecture Diagram** (PNG/SVG)
- 🖼️ **Screenshots** of the frontend & Grafana dashboard
- 🎥 **Project Demo Video** (YouTube/Loom)
- ☁️ **Deployment Steps** for GCP / AWS / Azure
- 🤝 **Contribution Guidelines**

## 💡 Need Help?

Let me know if you want help generating:

- 🧱 A diagram of your architecture  
- 📄 YAML templates for Prometheus/Grafana setup  
- ⚙️ GitHub Actions CI/CD for auto-deployments  

✨ Happy to help polish this project even more!
