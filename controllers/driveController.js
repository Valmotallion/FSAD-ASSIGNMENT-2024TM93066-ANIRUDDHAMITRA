const Drive = require('../models/Drive');
const Student = require('../models/Student');
const VaccinationReport = require('../models/VaccinationReport'); 

exports.getStudentsForDrive = async (req, res) => {
  try {
    const { driveId } = req.params;

    const students = await Student.find();

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const Drive = require('../models/Drive');
// const Student = require('../models/Student');

exports.createDrive = async (req, res) => {
  try {
    const { vaccineName, date, availableDoses, applicableClasses } = req.body;

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 15);

    // 1. ✅ Date must be ≥ 15 days in the future
    if (selectedDate < minDate) {
      return res.status(400).json({
        error: "Drive date must be at least 15 days from today.",
      });
    }

    // 2. ✅ Prevent overlapping drives (same date)
    const existingDrive = await Drive.findOne({ date: selectedDate });
    if (existingDrive) {
      return res.status(400).json({
        error: "A drive is already scheduled on this date.",
      });
    }

    // 3. ✅ Save the drive
    const newDrive = new Drive({
      vaccineName,
      date: selectedDate,
      availableDoses,
      applicableClasses,
    });

    const savedDrive = await newDrive.save();

    // 4. ✅ Create vaccination report
    const newReport = new VaccinationReport({
      vaccineName: savedDrive.vaccineName,
      date: savedDrive.date,
      totalDoses: savedDrive.availableDoses,
      vaccinatedStudents: 0,
    });

    await newReport.save();

    res.status(201).json({
      message: "Drive and report created successfully",
      drive: savedDrive,
      report: newReport,
    });

  } catch (err) {
    console.error("Error creating drive or report:", err);
    res.status(500).json({ message: "Failed to create drive and report" });
  }
};



exports.getAllDrives = async (req, res) => {
  try {
    const drives = await Drive.find();
    res.json(drives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUpcomingDrives = async (req, res) => {
  try {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);

    const drives = await Drive.find({
      date: { $gte: today, $lte: endDate },
    });

    res.json(drives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDrive = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ error: 'Drive not found' });

    const today = new Date();
    if (new Date(drive.date) <= today) {
      return res.status(403).json({ error: 'Cannot edit a past drive.' });
    }

    // Merge changes
    Object.assign(drive, req.body);
    await drive.save();
    res.json(drive);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteDrive = async (req, res) => {
  try {
    await Drive.findByIdAndDelete(req.params.id);
    res.json({ message: 'Drive deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
