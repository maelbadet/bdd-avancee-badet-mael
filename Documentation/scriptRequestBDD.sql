
SELECT * FROM employees;

SELECT AVG(salary) as average_salary FROM employees;

SELECT AVG(e.salary) AS average_salary_by_service FROM employees AS e
LEFT JOIN services AS s ON e.service_id = s.id
WHERE s.name = 'Finance';

DELIMITER $$
    CREATE PROCEDURE GetEmployeeCountByService()
    BEGIN
        SELECT s.name AS service_name, COUNT(e.id) AS employee_count
        FROM services as s
                 LEFT JOIN employees as e ON s.id = e.service_id
        GROUP BY s.id, s.name
        ORDER BY employee_count DESC;
    END $$
DELIMITER ;
CALL GetEmployeeCountByService();

DELIMITER $$
    CREATE PROCEDURE GetTop5ServicesBySalary()
    BEGIN
        SELECT s.name AS service_name, SUM(e.salary) AS total_salary
        FROM services as s
        LEFT JOIN employees as e ON s.id = e.service_id
        GROUP BY s.id, s.name
        ORDER BY total_salary DESC LIMIT 5;
    END $$
DELIMITER ;
CALL GetTop5ServicesBySalary();

DELIMITER $$
    CREATE PROCEDURE GetManagersAndServices()
    BEGIN
        SELECT CONCAT(e.first_name,' ', e.last_name) as name, s.name AS service_name
        FROM manages as m
        INNER JOIN employees as e ON m.employee_id = e.id
        INNER JOIN services as s ON m.service_id = s.id;
    END $$
DELIMITER ;
CALL GetManagersAndServices();

DELIMITER $$
    CREATE FUNCTION GetSalaryRange()
        RETURNS DECIMAL(10, 2)
        DETERMINISTIC
    BEGIN
        DECLARE max_salary DECIMAL(10, 2);
        DECLARE min_salary DECIMAL(10, 2);
        SET max_salary = (SELECT MAX(salary) FROM employees);
        SET min_salary = (SELECT MIN(salary) FROM employees);
    RETURN max_salary - min_salary;
    END $$
DELIMITER ;
SELECT GetSalaryRange() AS salary_range;

