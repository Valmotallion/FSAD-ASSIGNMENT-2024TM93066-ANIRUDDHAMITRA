// controllers/reportsController.js

const Student = require('../models/Student');

exports.getVaccinationReports = async (req, res) => {
  try {
    const { vaccineName } = req.query;

    const students = await Student.find().populate('vaccinations');
    const reports = [];

    students.forEach((student) => {
      if (student.vaccinations && student.vaccinations.length > 0) {
        student.vaccinations.forEach((drive) => {
          if (!vaccineName || (drive.vaccineName && drive.vaccineName.toLowerCase().includes(vaccineName.toLowerCase()))) {
            reports.push({
              studentName: student.name,
              grade: student.grade,
              status: 'Vaccinated',
              date: drive.date,
              vaccineName: drive.vaccineName,
            });
          }
        });
      } else if (!vaccineName) {
        // If no vaccinations and no filter, show "not vaccinated"
        reports.push({
          studentName: student.name,
          grade: student.grade,
          status: 'Not Vaccinated',
          date: '-',
          vaccineName: '-',
        });
      }
    });

    res.json(reports);
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
