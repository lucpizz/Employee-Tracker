var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeDB_Schema",
});

connection.connect(function (error) {
  if (error) throw error;
  employee_App();
});

function employee_App() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please choose a selection: ",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Employee List":
          viewEmployeeList();
          break;

        case "View All Employees by Department":
          viewDepartmentList();
          break;
      }
    });
}

function viewEmployeeList() {
  let query = "SELECT * FROM employee";
}

function viewDepartmentList() {
  let query = "SELECT * FROM department";
}
