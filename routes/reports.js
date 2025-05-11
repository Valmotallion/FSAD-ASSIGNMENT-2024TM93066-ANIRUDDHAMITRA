const express = require('express');
const router = express.Router();
const { getVaccinationReports } = require('../controllers/reportsController');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints for viewing vaccination reports
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get all vaccination reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: A list of vaccination reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   vaccineName:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   totalDoses:
 *                     type: number
 *                   vaccinatedStudents:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/', getVaccinationReports);

module.exports = router;
