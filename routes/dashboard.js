const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require('../middleware/authMiddleware');
const Student = require('../models/Student');
const Drive = require('../models/Drive');

// 🔐 Protect dashboard access
router.use(requireAuth);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: API endpoint for fetching vaccination dashboard statistics
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Fetch dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStudents:
 *                   type: integer
 *                   example: 1000
 *                 vaccinatedStudents:
 *                   type: integer
 *                   example: 800
 *                 pendingStudents:
 *                   type: integer
 *                   example: 200
 *                 totalDrives:
 *                   type: integer
 *                   example: 10
 *                 totalAvailableDoses:
 *                   type: integer
 *                   example: 500
 *       500:
 *         description: Failed to fetch dashboard stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch dashboard stats
 */
router.get('/', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const vaccinatedStudents = await Drive.countDocuments({ vaccinated: true });
        const pendingStudents = totalStudents - vaccinatedStudents;

        const totalDrives = await Drive.countDocuments();
        const totalAvailableDoseAgg = await Drive.aggregate([
            { $group: { _id: null, total: { $sum: '$availableDoses' } } }
        ]);
        const totalAvailableDoses = totalAvailableDoseAgg[0]?.total || 0;

        res.json({
            totalStudents,
            vaccinatedStudents,
            pendingStudents,
            totalDrives,
            totalAvailableDoses
        });
    } catch (err) {
        console.error('❌ Dashboard error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

module.exports = router;
