# Career Camp Database Management System
This project is aimed at maintaining a database of all student interviews for Career Camp's internal use. It includes storing various details such as batch information, student details, course scores, interviews, and results.

 ## Setup Instructions
To set up and run this project locally, follow these steps:

1. Fork Repository: Fork the repository from the Career Camp Database Management System on GitHub to your own GitHub account.

2. Clone Repository: Clone the forked repository to your local machine using the following command:

git clone <repository_URL>

3. Navigate to Project Directory: Change your current directory to the cloned repository's directory:

cd database-management

4. Install Node Modules: Install the required Node.js modules by running:

npm install

5. Setup Environment Variables: Set up environment variables by creating a .env file in the root directory of the project. This file should contain sensitive information such as database connection strings, API keys, etc. An example .env file might look like this:

DB_URL=your_database_connection_string_here
PORT=3000
JWT_SECRET=your_jwt_secret_here
SESSION_KEY=your_session_key_here


6. Run Server: Start the server by running the following command from the backend folder:

cd backend
node server.js

7. Access Application: Once the server is running, you can access the application by navigating to http://localhost:3000 in your web browser.

## Project Tasks
1. Sign Up and Sign In for Employees: Employees can sign up and sign in to access the system.
2. Manage Students: Employees can view a list of students and add new students, similar to managing posts in Codeial.
3. Manage Interviews: Employees can view a list of interviews and create new interviews, including specifying the date.
4. Allocate Students to Interviews: Employees can assign students to specific interviews.
5. Manage Interview Results: Employees can select an interview to view the list of all students and mark their result status directly from the list page.
