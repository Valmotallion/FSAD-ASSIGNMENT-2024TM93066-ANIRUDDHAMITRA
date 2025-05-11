const mongoose = require('mongoose');

const driveSchema =  new mongoose.Schema({
    vaccineName: {require: true,type: String},
    date: {require: true,type: Date},
    availableDoses: {type: Number, required: true},
    applicableClasses: [String],
}, { timestamps: true })

module.exports= mongoose.model('Drive', driveSchema);