import React from 'react';
import Papa from 'papaparse';
import { addStudent } from '../api';

const BulkUpload = ({ onUpload }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const uploaded = [];
        for (let row of results.data) {
          try {
            const newStudent = await addStudent(row);
            uploaded.push(newStudent);
          } catch (err) {
            console.error("Upload error:", err);
          }
        }
        onUpload(uploaded);
      }
    });
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">Bulk Upload Students</label>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
};

export default BulkUpload;
