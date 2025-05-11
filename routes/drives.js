const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');
const { requireAuth } = require('../middleware/authMiddleware');

// 🔐 Protect all drive routes
router.use(requireAuth);

/**
 * @swagger
 * tags:
 *   name: Drives
 *   description: API endpoints for managing vaccination drives
 */

/**
 * @swagger
 * /api/drives:
 *   post:
 *     summary: Create a new vaccination drive
 *     tags: [Drives]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vaccineName
 *               - date
 *               - availableDoses
 *               - applicableClasses
 *             properties:
 *               vaccineName:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               availableDoses:
 *                 type: integer
 *               applicableClasses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Drive created successfully
 *       400:
 *         description: Invalid input or date conflicts
 *       500:
 *         description: Server error
 */
router.post('/', driveController.createDrive);

/**
 * @swagger
 * /api/drives:
 *   get:
 *     summary: Get all vaccination drives
 *     tags: [Drives]
 *     responses:
 *       200:
 *         description: List of all drives
 *       500:
 *         description: Server error
 */
router.get('/', driveController.getAllDrives);

/**
 * @swagger
 * /api/drives/upcoming:
 *   get:
 *     summary: Get upcoming vaccination drives (next 30 days)
 *     tags: [Drives]
 *     responses:
 *       200:
 *         description: List of upcoming drives
 *       500:
 *         description: Server error
 */
router.get('/upcoming', driveController.getUpcomingDrives);

/**
 * @swagger
 * /api/drives/{driveId}/students:
 *   get:
 *     summary: Get all students for a specific vaccination drive
 *     tags: [Drives]
 *     parameters:
 *       - in: path
 *         name: driveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vaccination drive
 *     responses:
 *       200:
 *         description: List of students for the drive
 *       500:
 *         description: Server error
 */
router.get('/:driveId/students', driveController.getStudentsForDrive);

/**
 * @swagger
 * /api/drives/{id}:
 *   put:
 *     summary: Update a vaccination drive
 *     tags: [Drives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the drive
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vaccineName:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               availableDoses:
 *                 type: integer
 *               applicableClasses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Drive updated successfully
 *       400:
 *         description: Invalid input or date conflicts
 *       404:
 *         description: Drive not found
 *       500:
 *         description: Server error
 */
router.put('/:id', driveController.updateDrive);

/**
 * @swagger
 * /api/drives/{id}:
 *   delete:
 *     summary: Delete a vaccination drive
 *     tags: [Drives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the drive
 *     responses:
 *       200:
 *         description: Drive deleted successfully
 *       404:
 *         description: Drive not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', driveController.deleteDrive);

module.exports = router;
