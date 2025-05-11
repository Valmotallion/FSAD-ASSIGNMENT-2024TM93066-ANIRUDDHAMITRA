import React, { useState } from "react";
import axios from "axios";

const DriveForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    vaccineName: "",
    date: "",
    availableDoses: "",
    applicableClasses: [],
  });

  const allGrades = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4",
    "Grade 5", "Grade 6", "Grade 7", "Grade 8"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleClass = (grade) => {
    setForm((prev) => {
      const exists = prev.applicableClasses.includes(grade);
      return {
        ...prev,
        applicableClasses: exists
          ? prev.applicableClasses.filter((g) => g !== grade)
          : [...prev.applicableClasses, grade],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/drives", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Drive created successfully!");
      setForm({ vaccineName: "", date: "", availableDoses: "", applicableClasses: [] });
      onCreated(); // trigger refresh
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create drive");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-4">
      <h2 className="text-lg font-bold">Create Vaccination Drive</h2>

      <input
        type="text"
        name="vaccineName"
        placeholder="Vaccine Name"
        value={form.vaccineName}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="number"
        name="availableDoses"
        placeholder="Available Doses"
        value={form.availableDoses}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <div>
        <label className="font-semibold">Applicable Classes:</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {allGrades.map((grade) => (
            <label key={grade} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.applicableClasses.includes(grade)}
                onChange={() => toggleClass(grade)}
              />
              {grade}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Drive
      </button>
    </form>
  );
};

export default DriveForm;
