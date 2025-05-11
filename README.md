School Vaccination Portal
A comprehensive web application designed to manage student vaccination records, vaccination drives, and generate reports. This project is built using modern web technologies and provides an intuitive interface for administrators to manage vaccination data efficiently.

Table of Contents
Features
Technologies Used
Setup Instructions
Project Structure
Environment Variables
Usage
Contributing
License


Features
Core Features:
Student Management:

Add, edit, and delete student records.
Track vaccination status for each student.
Assign students to specific vaccination drives.
Vaccination Drives:

Create and manage vaccination drives.
Assign students to drives and track their vaccination progress.
Reports:

Generate detailed reports on vaccination rates.
Filter reports by vaccination drives, grades, or other criteria.
Pagination:

Navigate through large datasets with a responsive pagination system.
Authentication:

Secure login system for administrators.
Additional Features:
Responsive Design:

Fully responsive UI for seamless use on desktops, tablets, and mobile devices.
Error Handling:

Graceful error messages for invalid inputs or server issues.
Environment Configuration:

Use .env files for secure and flexible environment variable management.
Technologies Used
Frontend:
React.js: Component-based UI library for building interactive user interfaces.
React Router: For navigation and routing between pages.
React Paginate: For pagination functionality.
Tailwind CSS: Utility-first CSS framework for styling.
Backend:
Node.js: JavaScript runtime for building the backend API.
Express.js: Web framework for creating RESTful APIs.
MongoDB: NoSQL database for storing student and vaccination data.
Tools:
Vite: Fast build tool for modern web projects.
Axios: For making HTTP requests to the backend API.
dotenv: For managing environment variables.
Setup Instructions
Prerequisites:
Node.js: Ensure you have Node.js installed (v14 or higher recommended).
npm or yarn: Package manager for installing dependencies.
MongoDB: Set up a MongoDB instance (local or cloud).
Steps:
Clone the Repository:

git clone https://github.com/your-username/school-vaccination-portal.git
cd school-vaccination-portal

Install Dependencies:
npm install
# or
yarn install

Set Up Environment Variables:
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_SECRET_KEY=your-secret-key

Create a .env file in the root directory.
Add the following variables:
Run the Application:

Start the development server:
Open your browser and navigate to http://localhost:5173.
Run the Backend:

Ensure the backend API is running on http://localhost:3000.
Build for Production:
npm run build
# or
yarn build

To create a production build:
Project Structure
school-vaccination-portal/
├── public/                 # Static assets
├── src/
│   ├── api/                # API service files
│   ├── components/         # Reusable React components
│   ├── pages/              # Page-level components
│   ├── styles/             # Global styles
│   ├── App.jsx             # Main app component
│   ├── index.jsx           # Entry point
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in Git
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation


Environment Variables
The following environment variables are required for the project:

Variable	Description	Example Value
REACT_APP_API_URL	Base URL for the backend API	http://localhost:3000/api
REACT_APP_SECRET_KEY	Secret key for authentication	coordinator-token


Usage
Adding Students:
Navigate to the "Students" page.
Use the "Add Student" form to input student details.
Assign the student to a vaccination drive.
Managing Vaccination Drives:
Navigate to the "Drives" page.
Create a new drive by specifying the date and vaccine type.
Assign students to the drive.
Viewing Reports:
Navigate to the "Reports" page.
Filter reports by drive, grade, or vaccination status.
Export reports if needed.
Contributing
We welcome contributions to improve this project! To contribute:

Fork the repository.
Create a new branch:
git checkout -b feature/your-feature-name

Make your changes and commit them:
git commit -m "Add your message here"
Push to your branch:
git push origin feature/your-feature-name
Open a pull request on GitHub.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Let me know if you need further adjustments or additional sections!

ReactPaginate
