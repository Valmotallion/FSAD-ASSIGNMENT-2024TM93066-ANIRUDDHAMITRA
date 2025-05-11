const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('✅ GET / hit');
  res.send('It works!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Test server running at http://localhost:${PORT}`);
});
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Drive = require('./models/Drive');

const MONGO_URI = 'mongodb://localhost:27017/vaccine-portal';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  // Clear previous test data
  await Student.deleteMany({});
  await Drive.deleteMany({});

  // Seed Students
  const students = [
    { name: 'Alice', grade: 'Grade 6', vaccinated: true  },
    { name: 'Bob', grade: 'Grade 7', vaccinated: false  },
    { name: 'Charlie', grade: 'Grade 6', vaccinated: true   },
    { name: 'David', grade: 'Grade 8', vaccinated: false },
    { name: 'Eva', grade: 'Grade 7', vaccinated: true }
  ];

  await Student.insertMany(students);
  console.log('✅ Students inserted');

  // Seed Drives
  const now = new Date();
 // Seed Drives
const drives = [
  { date: new Date('2025-05-01'), location: 'School A', availableDoses: 50 },
  { date: new Date('2025-05-03'), location: 'School B', availableDoses: 30 },
  { date: new Date('2025-05-05'), location: 'School C', availableDoses: 20 }
];


  await Drive.insertMany(drives);
  console.log('✅ Drives inserted');

  mongoose.disconnect();
});
