// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getVaccinationReports = async () => {
  try {
    const token = localStorage.getItem('coordinator-token'); // Retrieve the token from localStorage or another secure place
    const response = await axios.get('http://localhost:3000/api/reports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vaccination reports:', error);
    throw error;
  }
};

export const getAllStudents = async () => {
  const token = 'coordinator-token'; // ideally, store this in localStorage or context
  const response = await axios.get(`${API_URL}/students`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUpcomingDrives = async () => {
  const res = await axios.get(`${API_URL}/drives/upcoming`);
  return res.data;
};
export const addStudent = async (student) => {
  const res = await axios.post(`${API_URL}/students`, student, {
    headers: { Authorization: 'Bearer coordinator-token' }
  });
  return res.data;
};

export const markAsVaccinated = async (studentId, driveId) => {
  return await axios.post(
    `${API_URL}/students/${studentId}/vaccinate`,
    { driveId }, // ✅ Must send correct ID here
    {
      headers: { Authorization: 'Bearer coordinator-token' },
    }
  );
};

export const getStudentsForDrive = async (driveId) => {
  const res = await axios.get(`${API_URL}/drives/${driveId}/students`, {
    headers: { Authorization: 'Bearer coordinator-token' },
  });
  return res.data;
};


// export const getVaccinationReports = async () => {
//   const res = await axios.get(`${API_URL}/reports`); // or correct backend path
//   return res.data;
// };
