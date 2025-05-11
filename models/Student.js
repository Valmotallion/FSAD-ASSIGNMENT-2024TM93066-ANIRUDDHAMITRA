const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade : { type: String, required: true },
  vaccinated: { type: Boolean, default: false },
  vaccinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drive' }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema)