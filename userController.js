const { query } = require('../DataBase'); // Adjust path as needed

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM users'; // Replace 'users' with your table name
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
};

// Function to add a new user
const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'; // Replace 'users' with your table name
    const params = [username, email, password];
    const result = await query(sql, params);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
};

module.exports = { getUsers, addUser };
