import React, { useState } from "react";
import axios from "axios";

const StudentForm = ({ onAdd, driveId }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !grade) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = { name, grade, driveId };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/api/students", newStudent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onAdd(response.data);
      setName("");
      setGrade("");
    } catch (error) {
      console.error("Error adding student:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Class"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
