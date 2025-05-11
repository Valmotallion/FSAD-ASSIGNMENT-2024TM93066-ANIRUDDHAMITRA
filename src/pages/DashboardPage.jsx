import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllStudents, getUpcomingDrives } from "../api";

const DashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);
  const [vaccinatedCount, setVaccinatedCount] = useState(null); // Initially null
  const [vaccinationRate, setVaccinationRate] = useState(null); // Initially null

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getAllStudents();
      const driveData = await getUpcomingDrives();

      setStudents(studentData);
      setDrives(driveData);

      // Perform calculations immediately after fetching data
      if (studentData.length > 0) {
        const vacced = studentData.filter((s) => s.vaccinations && s.vaccinations.length > 0);
        const vaccCount = vacced.length;
        const vaccRate = ((vaccCount / studentData.length) * 100).toFixed(1);
        console.log(studentData, vacced, vaccCount, vaccRate);
        setVaccinatedCount(vaccCount);
        setVaccinationRate(vaccRate);
      }
      
    };
    fetchData();
  }, []); // Only run once on component mount

  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-4">
            <h4 className="font-semibold text-gray-700">Total Students</h4>
            <p className="text-2xl font-bold text-blue-600">{students.length}</p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h4 className="font-semibold text-gray-700">Vaccinated</h4>
            <p className="text-2xl font-bold text-green-600">
              {vaccinatedCount !== null ? vaccinatedCount : "Loading..."}
            </p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h4 className="font-semibold text-gray-700">Vaccination Rate</h4>
            <p className="text-2xl font-bold text-indigo-600">
              {vaccinationRate !== null ? `${vaccinationRate}%` : "Loading..."}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4 mt-6">
          <h4 className="font-semibold text-gray-700 mb-2">Upcoming Drives</h4>
          {drives.length > 0 ? (
            <ul className="list-disc ml-6">
              {drives.map((drive) => (
                <li key={drive._id}>
                  {new Date(drive.date).toLocaleDateString()} — {drive.vaccineName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">No upcoming drives</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;