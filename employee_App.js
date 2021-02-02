/*

Intializing both mysql and inquirer frameworks to use for this application.

*/

var mysql = require("mysql");
var inquirer = require("inquirer");

/*

Intializing the msql connection to the database.

*/

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "admin",
  password: "Today2021!$",
  database: "employeeDB",
});

connection.connect(function (error) {
  if (error) throw error;
  employee_App();
});

/*

The employee_App function is the main code base running the Employee Tracker Appicaiton.
It uses the inquirer prompt and switch/case to navigate through the selections and calls the
other functions to display the result from the selection.

*/

function employee_App() {
  console.log("Welcome to the Employee Management System!");
  inquirer
    .prompt(
      {
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
      },
      {
        name: "quit",
        type: "confirm",
        message: "Would you like to quit the application?",
        default: false,
        when: (answer) => {
          return answer.action === "Exit Application";
        },
      }
    )
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployeeList((data_from_select_all) => {
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
          exitApp(answer);
          break;
      }
    });
}

/*

The viewEmployeeList queries the database to display the employees.

*/

function viewEmployeeList(cb) {
  let query = "SELECT * FROM employee";

  connection.query(query, (error, data) => {
    if (error) throw error;
    cb(data);
  });
}

/*

The viewDepartmentList function queries the database to display the departments.

*/

function viewDepartmentList() {
  let query = "SELECT * FROM department";

  connection.query(query, (error, data) => {
    if (error) throw error;
    console.table(data);
    return employee_App();
  });
}

/*

The viewRolesList function queries the database to display the roles.

*/

function viewRolesList() {
  let query = "SELECT * FROM roles";

  connection.query(query, (error, data) => {
    if (error) throw error;
    console.table(data);
    return employee_App();
  });
}

/*

This addEmployee function adds an employee into the database.  Uses both inquirer prompt, answer function, and connection query
to insert new employee into database.

*/

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

/*

The removeEmployee function 

*/

const removeEmployee = async () => {
  let employee_query;
  let employee_array;
  let answer;
  try {
    employee_query = await databaseSync(
      connection,
      "SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee",
      []
    );
    employee_array = employee_query.map((elem) => elem.name);
    answer = await inquirer.prompt([
      {
        type: "list",
        message: "Choose Employee To Remove: ",
        name: "name",
        choices: employee_array,
      },
    ]);
  } catch (err) {
    console.log(err);
    throw err;
  }
  const employeeID = employee_query.filter(
    (element) => element.name === answer.name
  );

  if (employeeID.length > 1) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        message: "Choose id",
        name: "id",
        choices: employeeID.map((element) => element.id),
      },
    ]);
    connection.query(
      "DELETE FROM employee WHERE id = ?",
      [answers.id],
      (error, result) => {
        if (error) throw error;
        console.log(`Employee ${answers.id} deleted`);
        employee_App();
      }
    );
  } else {
    connection.query(
      "DELETE FROM employee WHERE id = ?",
      [employeeID[0].id],
      (error, result) => {
        if (error) throw error;
        console.log(`${employeeID[0].name} deleted from employees`);
        employee_App();
      }
    );
  }
};

const databaseSync = (connection, sql, args) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

/*

The exitApp function quits the application.

*/

function exitApp(actions) {
  if (actions.quit === false) {
    employee_App();
  } else {
    connection.end();
    console.log("Good Bye!");
  }
}
