var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "admin",

  // Your password
  password: "Today2021!$",
  database: "employeeDB",
});

connection.connect(function (error) {
  if (error) throw error;
  employee_App();
});

function employee_App() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please choose a selection: ",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Remove Employee",
        "Exit Application",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployeeList((data_from_select_all) => {
            console.log("This is from the callback.");
            console.table(data_from_select_all);
            return employee_App();
          });
          break;

        case "View All Departments":
          viewDepartmentList();
          break;

        case "View All Roles":
          viewRolesList();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Exit Application":
          exitApp();
          break;
      }
    });
}

function viewEmployeeList(cb) {
  let query = "SELECT * FROM employee";

  connection.query(query, (error, data) => {
    if (error) throw error;
    cb(data);
  });
}

function viewDepartmentList() {
  let query = "SELECT * FROM department";

  connection.query(query, (error, data) => {
    if (error) throw error;
    console.table(data);
    return employee_App();
  });
}

function viewRolesList() {
  let query = "SELECT * FROM roles";

  connection.query(query, (error, data) => {
    if (error) throw error;
    console.table(data);
    return employee_App();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter first name: ",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter last name: ",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter role id number: ",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter manager id number: ",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (error) {
          if (error) throw error;
          console.log("Added successfully!");
          return employee_App();
        }
      );
    });
}

function removeEmployee() {
  viewEmployeeList((data) => {
    let user_array = data.map((user, index) => {
      return { value: user.id, name: `${user.first_name} ${user.last_name}` };
    });
    inquirer
      .prompt([
        {
          type: "list ",
          chocies: user_array,
          message: "Please select employee to remove.",
          name: "removeEmployee",
        },
      ])
      .then((data) => {
        console.log(data);
      });
  });
}

/*

function exitApp() {
  inquirer.prompt({
    name: "quit",
    type: "confirm",
    message: "Would you like to quit the application?",
    default: false,
    when: (answer) => {
      return answer.choices === "quit";
    },
  }).then (function ())
}

*/
