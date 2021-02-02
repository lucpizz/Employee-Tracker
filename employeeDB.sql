DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;


CREATE TABLE department (

id INT(15) AUTO_INCREMENT NOT NULL,
dept_name VARCHAR(30),
PRIMARY KEY (id)

);

CREATE TABLE roles (

id INT(15) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
dept_id INT(15) NOT NULL,
PRIMARY KEY (id)

);

CREATE TABLE employee (

id INT(15) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT(15) NOT NULL,
manager_id INT(15),
PRIMARY KEY (id) 

);



INSERT INTO department (id, dept_name) 
values (100, "HelpDesk");
INSERT INTO department (id, dept_name) 
values (200, "Engineering");
INSERT INTO department (id, dept_name) 
values (300, "Manager");


INSERT INTO roles (id, title, salary, dept_id)
VALUES (1234, "HelpDesk Agent", 40000.00, 100);
INSERT INTO roles (id, title, salary, dept_id)
VALUES (5678, "Software Engineer", 80000.00, 200);
INSERT INTO roles (id, title, salary, dept_id)
VALUES (9876, "Manager", 90000.00, 300);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Costas", 1234, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Ramos", 1235, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Becky", "Rios", 1236, 4);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;