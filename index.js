const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
const dashboardRoutes = require('./routes/dashboard');
const studentRoutes = require('./routes/students');
const driveRoutes = require('./routes/drives');
const reportsRoute = require('./routes/reports');
const swaggerDocs = require('./utils/swagger'); // ✅ Dynamic Swagger setup

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/reports', reportsRoute);

// ✅ ROOT TEST ROUTE
app.get('/', (req, res) => {
  res.send('✅ Server is working');
});

// ✅ SWAGGER DOCS (DYNAMIC - Do not override with static JSON)
swaggerDocs(app);

// ✅ MONGODB CONNECTION
mongoose.connect('mongodb://localhost:27017/vaccine-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});

// OPTIONAL: 404 debug logger
app.use((req, res, next) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  next();
});
