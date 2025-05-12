const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { requireAuth } = require('../middleware/authMiddleware');

// 🔐 Protect all student routes
router.use(requireAuth);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API endpoints for managing student records and vaccinations
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - className
 *             properties:
 *               name:
 *                 type: string
 *               className:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *       500:
 *         description: Server error
 */
router.get('/', studentController.getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
router.get('/:id', studentController.getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               className:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *       400:
 *         description: Bad request
 */
router.put('/:id', studentController.updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted
 *       500:
 *         description: Server error
 */
router.delete('/:id', studentController.deleteStudent);

/**
 * @swagger
 * /api/students/{id}/vaccinate:
 *   post:
 *     summary: Vaccinate a student for a given drive
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - driveId
 *             properties:
 *               driveId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student vaccinated
 *       400:
 *         description: Already vaccinated or invalid input
 *       404:
 *         description: Student or drive not found
 */
router.post('/:id/vaccinate', studentController.vaccinateStudent);

/**
 * @swagger
 * /api/students/bulk:
 *   post:
 *     summary: Bulk add students via CSV upload
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - className
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Alice
 *                 className:
 *                   type: string
 *                   example: Grade 5
 *     responses:
 *       201:
 *         description: Students added successfully
 *       400:
 *         description: Invalid student list
 *       500:
 *         description: Server error
 */

router.post('/bulk', studentController.bulkCreateStudents);

module.exports = router;
