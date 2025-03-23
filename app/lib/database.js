import mysql from 'mysql2/promise';

// Konfigurasi koneksi ke MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Fungsi untuk membuat koneksi ke MySQL
async function connectToDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database!');
    return connection;
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
    throw error;
  }
}

export default connectToDB;