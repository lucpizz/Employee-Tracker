DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;


CREATE TABLE department (

id INT(15) AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(50) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE roles (

id INT(15) AUTO_INCREMENT NOT NULL,
title VARCHAR(50) NOT NULL,
salary DECIMAL,
dept_id INT(15) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE employee (

id INT(15) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
role_id INT(15) NOT NULL,
manager_id INT(15)

);



--Department--

INSERT INTO department (id, name) 
VALUES (100, "HelpDesk");

--Role--

INSERT INTO roles (id, title, salary, dept_id)
VALUES (1234, "HelpDesk Agent", 40000.00, 100);

--Employee--

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Tom", "Costas", 1234, 2);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;