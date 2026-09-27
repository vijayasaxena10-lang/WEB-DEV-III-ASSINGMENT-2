// In-memory student data.
// This is sufficient for the lab assignment; no database is required.
let students = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 20,
    course: "B.Tech CSE",
    email: "aarav@example.com"
  },
  {
    id: 2,
    name: "Priya Verma",
    age: 19,
    course: "B.Tech CSE",
    email: "priya@example.com"
  }
];

let nextId = 3;

// GET /students
const getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

// GET /students/:id
const getStudentById = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid student ID. ID must be a positive integer.");
    error.statusCode = 400;
    return next(error);
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    const error = new Error(`Student with ID ${id} not found.`);
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: student
  });
};

// POST /students
const createStudent = (req, res) => {
  const { name, age, course, email } = req.body;

  const newStudent = {
    id: nextId++,
    name: name.trim(),
    age: Number(age),
    course: course.trim(),
    email: email.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: newStudent
  });
};

// PUT /students/:id
const updateStudent = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid student ID. ID must be a positive integer.");
    error.statusCode = 400;
    return next(error);
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    const error = new Error(`Student with ID ${id} not found.`);
    error.statusCode = 404;
    return next(error);
  }

  const { name, age, course, email } = req.body;

  students[studentIndex] = {
    id,
    name: name.trim(),
    age: Number(age),
    course: course.trim(),
    email: email.trim()
  };

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: students[studentIndex]
  });
};

// DELETE /students/:id
const deleteStudent = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("Invalid student ID. ID must be a positive integer.");
    error.statusCode = 400;
    return next(error);
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    const error = new Error(`Student with ID ${id} not found.`);
    error.statusCode = 404;
    return next(error);
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
