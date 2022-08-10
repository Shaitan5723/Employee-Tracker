-- query for adding deparment name into roles table
CREATE PROCEDURE all_Roles
AS
SELECT roles.title, roles.id, departments.department_name, roles.salary 
FROM roles
INNER JOIN departments 
ON roles.departments_id=departments.id
GO;

-- query for joining roles table to employees table at job titles
-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
