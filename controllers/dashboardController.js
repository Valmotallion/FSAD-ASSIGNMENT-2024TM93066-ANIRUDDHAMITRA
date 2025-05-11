const Student = require('../models/Student');
const Drive = require('../models/Drive');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const vaccinatedStudents = await Student.countDocuments({ vaccinated: true });
    const vaccinationRate = totalStudents > 0 ? Math.round((vaccinatedStudents / totalStudents) * 100) : 0;

    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const upcomingDrives = await Drive.countDocuments({
      date: { $gte: today, $lte: next30Days },
    });

    res.json({
      totalStudents,
      vaccinatedStudents,
      vaccinationRate,
      upcomingDrives
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
