-- query for adding deparment name into roles table
SELECT roles.title, roles.id, departments.department_name, roles.salary 
FROM roles
INNER JOIN departments 
ON roles.departments_id=departments.id;

-- query for joining managers to employees list based on id
-- SELECT employees.id, employees.first_name, employees.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
-- FROM employees
-- LEFT JOIN employees manager on manager.id = employees.manager_id
-- WHERE employees.manager_id IS NOT NULL
-- ORDER BY employees.manager_id;

-- query for joining roles table to employees table at job titles
SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employees
INNER JOIN roles ON employees.roles_id=roles.id
INNER JOIN departments ON roles.departments_id=departments.id
LEFT JOIN employees manager on manager.id = employees.manager_id
ORDER BY employees.id;
