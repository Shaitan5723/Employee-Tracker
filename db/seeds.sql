INSERT INTO departments (department_name)
VALUES ("Customer Service"),
      ("Sales"),
      ("R&D");

INSERT INTO roles (title, salary, departments_id)
VALUES ("Customer Service Rep", 50000, 1),
      ("Customer Service Manager", 80000, 1),
      ("Sales Representative", 55000, 2),
      ("Sales Manager", 80000, 2),
      ("R&D Researcher", 70000, 3),
      ("R&D Manager", 90000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Bob", "Newby", 1, 2),
      ("Jim", "Hopper", 2, NULL),
      ("Will", "Byers", 3, 4),
      ("Max", "Mayfield", 4, NULL),
      ("Conan", "O'Brien", 5, 6),
      ("Jordan", "Schlansky", 6, NULL);