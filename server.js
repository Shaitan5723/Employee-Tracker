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
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employees
  INNER JOIN roles ON employees.roles_id=roles.id
  INNER JOIN departments ON roles.departments_id=departments.id
  LEFT JOIN employees manager on manager.id = employees.manager_id
  ORDER BY employees.id;`;
  
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
      db.query(`INSERT INTO departments(department_name) VALUES (?);`, answer.departmentName, (err, res) => {
        if (err) throw err;
        console.log(`Successfully added ${answer.departmentName} to departments table`)
        console.table(res);
        start();
      });
    })
 
  
}

function addRole() {
  inquirer.prompt([{
    message: "Please enter a new role name.",
    name: "roleName",
    type: "input",
  },
  {
    message: "Please enter the role's salary.",
    name: "roleSalary",
    type: "input",
  },
  {
    message: "Please enter the department id the role belongs to.",
    name: "roleDepartment",
    type: "input",
  }])
    .then((answer) => {
      db.query(`INSERT INTO roles(title, salary, departments_id) VALUES (?,?,?);`, [answer.roleName, answer.roleSalary, parseInt(answer.roleDepartment)], (err, res) => {
        if (err) throw err;
        console.log(`Successfully added ${answer.roleName} to role's table`)
        console.table(res);
        start();
      });
    })
  
}

function addEmployee() {
  inquirer.prompt([{
    message: "Please enter the new employee's first name.",
    name: "employeeFirstName",
    type: "input",
  },
  {
    message: "Please enter the new employee's last name.",
    name: "employeeLastName",
    type: "input",
  },
  {
    message: "Please enter the new employee's role id.",
    name: "roleId",
    type: "input",
  },
  {
    message: "Please enter the new employee's manager id.",
    name: "managerID",
    type: "input",
  }])
    .then((answer) => {
      db.query(`INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?);`, [answer.employeeFirstName, answer.employeeLastName, answer.roleId, answer.managerID], (err, res) => {
        if (err) throw err;
        console.log(`Successfully added ${answer.employeeFirstName} to employee's table`)
        console.table(res);
        start();
      });
    })
}

function updateEmployee() {
  console.log("Awaiting construction")
  start();
}

db.connect(err => {
  if (err) throw err;
  start();
})