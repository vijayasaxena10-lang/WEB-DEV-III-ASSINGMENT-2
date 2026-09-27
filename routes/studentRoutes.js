const express = require("express");

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const validateStudent = require("../middleware/validateStudent");

const router = express.Router();

// GET /students - retrieve all students
router.get("/", getAllStudents);

// GET /students/:id - retrieve a student by ID
router.get("/:id", getStudentById);

// POST /students - add a new student
router.post("/", validateStudent, createStudent);

// PUT /students/:id - update student details
router.put("/:id", validateStudent, updateStudent);

// DELETE /students/:id - delete a student
router.delete("/:id", deleteStudent);

module.exports = router;
