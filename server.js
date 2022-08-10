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


// Start menu that prompts user for instructions
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
// Switch statement used to cycle through reponses based on user selection 
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
        };
    });
};

function viewDepartments() {
  const sql = `SELECT * FROM departments`;
  
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.log('Showing all departments')
    console.table(res);
    start();
  })
};

function viewRoles() {
  const sql = `SELECT roles.title, roles.id, departments.department_name, roles.salary 
  FROM roles
  INNER JOIN departments 
  ON roles.departments_id=departments.id`;
  
  db.query(sql, (err,res) => {
    if (err) throw err;
    console.log('Showing all roles')
    console.table(res);
    start();
  })
};

function viewEmployees() {
  const sql = `SELECT * FROM employees`;
  
  db.query(sql, (err,res) => {
    if (err) throw err;
    console.log('Showing all employees')
    console.table(res);
    start();
  })
};

function addDepartment() {
  inquirer.prompt({
    name: "departmentName",
    type: "input",
    message: "Please enter a new department name.",
  })
    .then((answer) => {
      db.query(`ALTER TABLE departments ADD ${answer} varchar(30) NOT NULL;`, (err, res) => {
        if (err) throw err;
        console.log(`Successfully added ${answer} to departments table`)
        console.table(res);
        start();
      });
    })
 
  
}

function addRole() {
  console.log("Awaiting construction")
  start();
}

function addEmployee() {
  console.log("Awaiting construction")
  start();
}

function updateEmployee() {
  console.log("Awaiting construction")
  start();
}

db.connect(err => {
  if (err) throw err;
  start();
})