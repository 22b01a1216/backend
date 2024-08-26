const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           // Replace with your database username
  password: 'your_password_here', // Replace with your database password
  database: 'india_guide_db',
  port: 3307,             // Use the correct port number
  waitForConnections: true,
  connectionLimit: 10,   // Adjust based on your needs
  queueLimit: 0
});

// Function to get a connection from the pool
const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database.');
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    throw err;
  }
};

// Function to execute a query
const query = async (sql, params = []) => {
  let connection;
  try {
    connection = await getConnection();
    const [results] = await connection.query(sql, params);
    return results;
  } catch (err) {
    console.error('Error executing query:', err.stack);
    throw err;
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
};

// Export the pool and functions
module.exports = {
  getConnection,
  query,
  pool
};
