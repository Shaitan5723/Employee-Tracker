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
},
console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

db.connect(function(err) {
  if (err) throw err;
  start();
});

// Main menu that prompts user for instructions
function start() {
  inquirer.prompt({
    name: "start_menu",
    type: "list",
    message: "What would you like to do?",
    choices: ["View all departments", 
      "View all roles", 
      "View all employees", 
      "Add a department",
      "Add a role", 
      "Add an employee", 
      "Update employee role", 
      "Exit"]
  })
      // switch statement used to cycle through reponses based on user selection 
    .then((res) => {
      switch (res.start_menu) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;  

        case 'View all employees':
          viewEmployees();  
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update employee role":
          updateEmployee();
          break;

        case "Exit":
          db.end();
          break;
        }
    });
};