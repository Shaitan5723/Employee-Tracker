const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

require('dotenv').config();

// Create connection to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

