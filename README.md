# Employee-Tracker

## Description
This application is run in the terminal and used to view and generate a databse to track several tables of data concerning a company's employees based on user input and selection of criteria.
Users are able to input the details of departments, roles and employee data to quickly populate a database with important details that they can then access at a later date. 

Below is a video demo on how the application is used. </br>


https://user-images.githubusercontent.com/105050107/183912174-cd3b16ce-f4d5-45fb-ae8e-37f6f82f8a38.mp4



In case the above video does not work, please use [this link](https://drive.google.com/file/d/1hbdLWu_TFU6KSHn3i68kSV5e8zLGhHKr/view).
</br>

## Directions
To use the application, users would first have to login to mysql on their machina to create the database that the application will us. 
To do this, the process would be as follows:
1. Run (in terminal) 'mysql -u (username) -p (password)' with their username and password, 
2. 'SOURCE ./db/schema.sql'.
3. quit
4. rename .env.EXAMPLE to .env
5. open .env
6. enter the values of the database, their mysql username and password into the corresponding fields
7. save .env
8. (run in terminal) node server.js

The database shown in the video is prepopulated with data from the seeds.sql file in the [db folder](https://github.com/Shaitan5723/Employee-Tracker/tree/main/db).
If users would like to also seed their file with the provided data, then they would run 'SOURCE ./db/seeds.sql' between steps 2 and 3.

## Technologies Used
The application is run with nodeJS and uses MySQL as a database management system.

## Whats Ahead
The versatility of the application could be vastly improved with additional functions added.
Functions to add:
1. Delete functions (for all tables)
2. Update manager (currently, updating an employee's role keeps them under the same manager)
3. Loading proper values for certain functions (adding employees under different roles requires memorizing role id's which is not great)
4. Adding Employees may automatically update departments and roles (might not be feasible). 
