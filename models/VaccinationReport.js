const mongoose = require('mongoose');

const vaccinationReportSchema = new mongoose.Schema({
  vaccineName: String,
  date: Date,
  totalDoses: Number,
  vaccinatedStudents: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('VaccinationReport', vaccinationReportSchema);
