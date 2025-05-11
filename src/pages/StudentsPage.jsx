import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", className: "" });

  // Fetch drives
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/drives", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDrives(response.data);
      } catch (error) {
        console.error("Error fetching drives:", error.response?.data || error.message);
      }
    };
    fetchDrives();
  }, []);

  // Fetch students for selected drive
  const fetchStudents = async (driveId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/students?driveId=${driveId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error.response?.data || error.message);
    }
  };

  const handleDriveChange = (e) => {
    const driveId = e.target.value;
    setSelectedDrive(driveId);
    if (driveId) {
      fetchStudents(driveId);
    } else {
      setStudents([]);
    }
  };

  const handleMarkAsVaccinated = async (studentId) => {
    if (!selectedDrive) {
      alert("Please select a drive before marking a student as vaccinated.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/students/${studentId}/vaccinate`,
        { driveId: selectedDrive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStudents(selectedDrive); // Refresh list
    } catch (error) {
      console.error("Error marking student as vaccinated:", error.response?.data || error.message);
    }
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const isVaccinatedInDrive = (student) =>
    student.vaccinations?.includes(selectedDrive);

  const startEditing = (student) => {
    setEditingStudentId(student._id);
    setEditedStudent({ name: student.name, className: student.grade });
  };

  const handleSaveUpdate = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/students/${studentId}`,
        editedStudent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStudents(selectedDrive);
      setEditingStudentId(null);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // ✅ Immediately update UI without needing full refresh
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };
  

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4 text-center">Students</h2>

      {/* Drive Dropdown */}
      <div className="mb-4 flex items-center justify-center">
        <label className="mr-2 font-semibold">Select Drive:</label>
        <select
          value={selectedDrive}
          onChange={handleDriveChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">-- Select Drive --</option>
          {drives.map((drive) => (
            <option key={drive._id} value={drive._id}>
              {drive.vaccineName} ({drive.date.substring(0, 10)})
            </option>
          ))}
        </select>
      </div>

      {/* Add Student Form (shown only when drive is selected) */}
      {selectedDrive && (
        <div className="mb-6">
          <StudentForm onAdd={handleAddStudent} />
        </div>
      )}

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Class</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const isEditing = editingStudentId === student._id;
              return (
                <tr key={student._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {isEditing ? (
                      <input
                        value={editedStudent.name}
                        onChange={(e) =>
                          setEditedStudent({ ...editedStudent, name: e.target.value })
                        }
                        className="border px-2 py-1"
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isEditing ? (
                      <input
                        value={editedStudent.grade}
                        onChange={(e) =>
                          setEditedStudent({ ...editedStudent, grade: e.target.value })
                        }
                        className="border px-2 py-1"
                      />
                    ) : (
                      student.grade
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {selectedDrive
                      ? isVaccinatedInDrive(student)
                        ? "Vaccinated"
                        : "Not Vaccinated"
                      : "Select a Drive"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    {selectedDrive && !isVaccinatedInDrive(student) && !isEditing && (
                      <button
                        onClick={() => handleMarkAsVaccinated(student._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Mark as Vaccinated
                      </button>
                    )}
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSaveUpdate(student._id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingStudentId(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(student)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default StudentsPage;
