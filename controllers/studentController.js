const mongoose = require('mongoose');
const Student = require('../models/Student'); 
const Drive = require('../models/Drive');


exports.createStudent = async(req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err){
        res.status(400).json({ error: err.message });
    }
};

exports.getAllStudents = async(req,res)=>{
    try {
        const students = await Student.find();
        res.json(students);
    } catch(err) {
        res.status(500).json({ error: err.message})
    }
}

exports.getStudentById = async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({error: 'Student not found'});
        res.json(student);
    }
    catch(err){
        res.status(500).json({ error:err.message})
    }
}
exports.updateStudent = async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // 👈 this is important to return the updated doc
      );
      res.json(updatedStudent); // ✅ send just the student object
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

  exports.deleteStudent = async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.json({ message: 'Student deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


// exports.vaccinateStudent = async (req, res) => {
//   try {

//     const { driveId } = req.body;

// if (!driveId) {
//   return res.status(400).json({ error: 'driveId is required' });
// }

// // Validate the ObjectId
// if (!mongoose.Types.ObjectId.isValid(driveId)) {
//   return res.status(400).json({ error: 'Invalid driveId' });
// }

// const student = await Student.findById(req.params.id);
// if (!student) return res.status(404).json({ error: 'Student not found' });

// if (student.vaccinations.includes(driveId)) {
//   return res.status(400).json({ error: 'Already vaccinated in this drive' });
// }

// student.vaccinations.push(driveId);
// await student.save();

// res.json(student);

//     // const { id } = req.params;
//     // const { driveId } = req.body;

//     // console.log('ID:', driveId, id); // Debugging line

//     // const student = await Student.findById(id); // <== this must work
//     // if (!student) return res.status(404).json({ error: `Student not found : ${}` });

//     // // Already vaccinated in this drive?
//     // if (student.vaccinations.includes(driveId)) {
//     //   return res.status(400).json({ error: 'Already vaccinated in this drive' });
//     // }

//     // student.vaccinations.push(driveId);
//     // await student.save();
//     // res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



exports.vaccinateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { driveId } = req.body;

    // Validate studentId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    // Validate driveId
    if (!driveId || !mongoose.Types.ObjectId.isValid(driveId)) {
      return res.status(400).json({ error: 'Valid driveId is required' });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Prevent duplicate vaccination
    if (student.vaccinations.includes(driveId)) {
      return res.status(400).json({ error: 'Already vaccinated in this drive' });
    }

    student.vaccinations.push(driveId);
    await student.save();

    res.status(200).json(student);
  } catch (err) {
    console.error("Vaccination error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
