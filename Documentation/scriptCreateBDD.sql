CREATE DATABASE company;

USE company;

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    office_number VARCHAR(50)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    salary DECIMAL(10, 2) NOT NULL,
    service_id INT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

CREATE TABLE manages (
    service_id INT,
    employee_id INT,
    start_sate DATE,
    PRIMARY KEY (service_id, employee_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

INSERT INTO services (name, office_number) VALUES
    ('IT Support', '101'),
    ('Human Resources', '102'),
    ('Finance', '103'),
    ('Marketing', '104'),
    ('Sales', '105');

INSERT INTO employees (first_name, last_name, email, salary, service_id) VALUES
    ('Alice', 'Smith', 'alice.smith@example.com', 55000, 1),
    ('Bob', 'Johnson', 'bob.johnson@example.com', 48000, 1),
    ('Charlie', 'Williams', 'charlie.williams@example.com', 63000, 1),
    ('Diana', 'Brown', 'diana.brown@example.com', 72000, 2),
    ('Ethan', 'Jones', 'ethan.jones@example.com', 45000, 3),
    ('Fiona', 'Garcia', 'fiona.garcia@example.com', 52000, 4),
    ('George', 'Martinez', 'george.martinez@example.com', 58000, 5),
    ('Hannah', 'Lee', 'hannah.lee@example.com', 67000, 4),
    ('Ivan', 'Taylor', 'ivan.taylor@example.com', 75000, 3),
    ('Jasmine', 'Anderson', 'jasmine.anderson@example.com', 49000, 3);

INSERT INTO manages (service_id, employee_id) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (3, 5),
    (4, 6),
    (5, 7),
    (4, 8),
    (3, 9),
    (3, 10);

