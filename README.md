
School Vaccination Portal
A comprehensive web application for managing student vaccination drives, tracking vaccination statuses, and generating reports. This project is built using Node.js, Express, and MongoDB.

Table of Contents
Features
Technologies Used
Setup Instructions
Environment Variables
API Documentation
Database Schema
Project Structure
Contributing
License
Features
Student Management:
Add, update, delete, and fetch student details.
Track vaccination status for each student.
Vaccination Drives:
Create and manage vaccination drives.
Automatically generate vaccination reports for each drive.
Reports:
Generate detailed vaccination reports filtered by vaccine name or date.
Authentication:
Secure routes using token-based authentication.
API Documentation:
Swagger UI integration for easy API testing and documentation.
Technologies Used
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: Token-based authentication (e.g., JWT)
API Documentation: Swagger UI
Testing: Postman (for API testing)
Other Tools:
dotenv for environment variable management.
cors for Cross-Origin Resource Sharing.
Setup Instructions
Prerequisites
Node.js (v14 or higher)
MongoDB (local or cloud instance)
Git
Steps to Set Up the Project
Clone the Repository: git clone https://github.com/<your-username>/school-vaccination-portal.git
cd school-vaccination-portal

Install Dependencies: npm install

Set Up Environment Variables:

Create a .env file in the root directory.
Add the following variables: PORT=3000
MONGO_URI=mongodb://localhost:27017/vaccine-portal
JWT_SECRET=your_jwt_secret

Start the Server:npm start

Access the Application:

API Base URL: http://localhost:3000/api
Swagger Documentation: http://localhost:3000/api-docs
Environment Variables
The following environment variables are required for the project:

PORT: The port on which the server runs (default: 3000).
MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key for token-based authentication.
API Documentation
The API documentation is available via Swagger UI. Once the server is running, visit: http://localhost:3000/api-docs

Endpoints Overview
Students:
GET /students: Fetch all students.
POST /students: Add a new student.
GET /students/:id: Fetch a student by ID.
PUT /students/:id: Update a student.
DELETE /students/:id: Delete a student.
POST /students/:id/vaccinate: Vaccinate a student.
Vaccination Drives:
POST /drives: Create a new vaccination drive.
GET /drives: Fetch all vaccination drives.
Reports:
GET /reports: Fetch vaccination reports (filterable by vaccine name).
Database Schema
1. Student Schema:
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  vaccinated: { type: Boolean, default: false },
  vaccinationDetails: {
    vaccineName: { type: String },
    date: { type: Date }
  }
});
2. Drive Schema:
const driveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, required: true },
  availableDoses: { type: Number, required: true },
  applicableClasses: { type: [String], required: true }
});
3. Vaccination Report Schema
const vaccinationReportSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, required: true },
  totalDoses: { type: Number, required: true },
  vaccinatedStudents: { type: Number, default: 0 }
});


Project Structure:
school-vaccination-portal/
├── controllers/         # API controllers
│   ├── studentController.js
│   ├── driveController.js
│   ├── reportsController.js
├── models/              # Mongoose schemas
│   ├── Student.js
│   ├── Drive.js
│   ├── VaccinationReport.js
├── routes/              # API routes
│   ├── students.js
│   ├── drives.js
│   ├── reports.js
├── utils/               # Utility files (e.g., Swagger setup)
│   ├── swagger.js
├── .env                 # Environment variables
├── .gitignore           # Ignored files
├── index.js             # Main server file
├── package.json         # Project metadata and dependencies
├── swagger.json         # Swagger API documentation



Features in Detail
1. Student Management
Add, update, delete, and fetch student details.
Track vaccination status and vaccination details for each student.
2. Vaccination Drives
Create vaccination drives with details like vaccine name, date, available doses, and applicable classes.
Automatically generate vaccination reports for each drive.
3. Reports
Generate detailed vaccination reports.
Filter reports by vaccine name or date.
4. Authentication
Secure routes using token-based authentication.
Use Authorization: Bearer <token> in headers for protected routes.
Contributing
We welcome contributions! To contribute:

Fork the repository.
Create a new branch:
Commit your changes:
Push to your branch:
Open a pull request.

