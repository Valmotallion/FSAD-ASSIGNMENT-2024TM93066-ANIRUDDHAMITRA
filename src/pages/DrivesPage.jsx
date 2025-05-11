import React, { useEffect, useState } from 'react';
import { getUpcomingDrives } from '../api';
import { CSVLink } from 'react-csv';
import Layout from '../components/Layout';
import DriveForm from '../components/DriveForm';
import axios from 'axios';

const DrivesPage = () => {
  const [drives, setDrives] = useState([]);
  const [filter, setFilter] = useState('');
  const [editingDrive, setEditingDrive] = useState(null);
  const [editForm, setEditForm] = useState({ vaccineName: '', availableDoses: '' });
  
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const data = await getUpcomingDrives();
        setDrives(data);
      } catch (err) {
        console.error("Error fetching drives:", err);
      }
    };
    fetchDrives();
  }, []);

  const filteredDrives = filter
    ? drives.filter(d => d.vaccineName.toLowerCase().includes(filter.toLowerCase()))
    : drives;

  const headers = [
    { label: 'Vaccine Name', key: 'vaccineName' },
    { label: 'Date', key: 'date' },
    { label: 'Available Doses', key: 'availableDoses' },
    { label: 'Applicable Classes', key: 'applicableClasses' }
  ];

  const handleEditClick = (drive) => {
    setEditingDrive(drive._id);
    setEditForm({ vaccineName: drive.vaccineName, availableDoses: drive.availableDoses });
  };
  
  const handleUpdateDrive = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/drives/${editingDrive}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Drive updated");
      setEditingDrive(null);
      window.location.reload(); // OR refreshDrives()
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };
  
  const handleDeleteDrive = async (driveId) => {
    const confirm = window.confirm("Are you sure you want to delete this drive?");
    if (!confirm) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/drives/${driveId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Drive deleted.");
      const updated = await getUpcomingDrives();
      setDrives(updated);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete drive.");
    }
  };
  
  const formatClasses = (classes) => classes.join(', ');

  return (
    <div className="p-4">
      <Layout>
  <div className="p-4 max-w-4xl mx-auto">
    <h2 className="text-xl font-bold mb-4">Upcoming Vaccination Drives</h2>

    {/* Add Drive Form */}
    <DriveForm onCreated={() => window.location.reload()} />

    {/* Filter and Export */}
    <input
      type="text"
      placeholder="Filter by vaccine name"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-2 mb-4 w-full"
    />

    <CSVLink
      data={filteredDrives.map(d => ({
        ...d,
        applicableClasses: formatClasses(d.applicableClasses),
        date: new Date(d.date).toLocaleDateString()
      }))}
      headers={headers}
      filename="vaccination_drives.csv"
    >
      <button className="bg-green-600 text-white px-4 py-2 mb-4 rounded">Export CSV</button>
    </CSVLink>

    {/* Drives Table */}
    <table className="min-w-full border bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Vaccine</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Available Doses</th>
          <th className="border px-4 py-2">Applicable Classes</th>
          <th className="border px-4 py-2">Actions</th> 
        </tr>
      </thead>
      <tbody>
        {filteredDrives.map((drive, index) => (
          <tr key={index} className={new Date(drive.date) <= new Date() ? 'bg-gray-100 text-gray-500' : ''}>
            <td className="border px-4 py-2 text-left">{drive.vaccineName}
</td>
            <td className="border px-4 py-2">{new Date(drive.date).toLocaleDateString()}
</td>
            <td className="border px-4 py-2">{drive.availableDoses}
</td>
            <td className="border px-4 py-2 text-left">{formatClasses(drive.applicableClasses)}
</td>
<td className="border px-4 py-2 text-center">
  {new Date(drive.date) > new Date() ? (
    <>
    <button
      onClick={() => handleEditClick(drive)}
      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
    >
      Edit
    </button>
    <button
      onClick={() => handleDeleteDrive(drive._id)}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Delete
    </button>
  </>
  ) : (
    <span className="text-gray-400 italic">Completed</span>
  )}
</td>

    
          </tr>
        ))}
      </tbody>
    </table>

    {editingDrive && (
  <div className="bg-white p-4 mt-4 shadow rounded">
    <h3 className="text-lg font-semibold mb-2">Edit Drive</h3>
    <input
      type="text"
      value={editForm.vaccineName}
      onChange={(e) => setEditForm({ ...editForm, vaccineName: e.target.value })}
      className="border p-2 mb-2 w-full"
      placeholder="Vaccine Name"
    />
    <input
      type="number"
      value={editForm.availableDoses}
      onChange={(e) => setEditForm({ ...editForm, availableDoses: e.target.value })}
      className="border p-2 mb-2 w-full"
      placeholder="Available Doses"
    />
    <div className="flex gap-2">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleUpdateDrive}
      >
        Save
      </button>
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded"
        onClick={() => setEditingDrive(null)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

  </div>
</Layout>

    </div>
  );
};

export default DrivesPage;
