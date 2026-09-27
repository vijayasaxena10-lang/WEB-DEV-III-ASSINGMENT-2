// Custom validation middleware for POST and PUT requests.
const validateStudent = (req, res, next) => {
  const { name, age, course, email } = req.body;

  const missingFields = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    missingFields.push("name");
  }

  if (age === undefined || age === null || age === "" || !Number.isInteger(Number(age)) || Number(age) <= 0) {
    missingFields.push("age");
  }

  if (!course || typeof course !== "string" || !course.trim()) {
    missingFields.push("course");
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    missingFields.push("email");
  }

  if (missingFields.length > 0) {
    const error = new Error(
      `Missing or invalid required fields: ${missingFields.join(", ")}`
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = validateStudent;
