DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;


CREATE TABLE department (

id INT(15) PRIMARY KEY NOT NULL,
dept_name VARCHAR(50)

);

CREATE TABLE roles (

id INT(15) NOT NULL,
title VARCHAR(50) NOT NULL,
salary DECIMAL NOT NULL,
dept_id INT(15) NOT NULL

);

CREATE TABLE employee (

id INT(15) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
role_id INT(15) NOT NULL,
manager_id INT(15),
PRIMARY KEY (id) 

);



INSERT INTO department (id, dept_name) 
values (100, "HelpDesk");


INSERT INTO roles (id, title, salary, dept_id)
VALUES (1234, "HelpDesk Agent", 40000.00, 100);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Costas", 1234, 2);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;