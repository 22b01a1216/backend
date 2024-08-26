const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./authController'); // Ensure you have the correct path

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Replace with your database username
  password: '',           // Replace with your database password
  database: 'india_guide_db',
  port: 3307              // Use the correct port number
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Registration Endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validate request
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert data into the database
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  const params = [username, email, password];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.json({ message: 'User registered successfully' });
  });
});

// Use the authController routes
/*app.use('/api/auth', authController);*/

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
