# Student Service API - Web Development III Lab 2

A RESTful Student Management API built with Node.js and Express.js.

## Requirements Covered

- Node.js project setup
- Express.js backend
- Student routes
- GET, POST, PUT and DELETE methods
- Route parameter: `/students/:id`
- CRUD APIs
- JSON request/response data
- Custom request-logging middleware
- Custom student-validation middleware
- Centralized error-handling middleware
- HTTP status codes
- Invalid ID handling
- Student-not-found handling
- Missing/invalid required fields
- Unsupported route handling
- Internal server error handling
- Postman/Thunder Client test cases

## Project Structure

```text
student-service/
├── middleware/
│   ├── errorHandler.js
│   ├── requestLogger.js
│   └── validateStudent.js
├── routes/
│   └── studentRoutes.js
├── controllers/
│   └── studentController.js
├── server.js
├── package.json
└── README.md
```

## How to Run

### 1. Open the project

Open the `student-service` folder in VS Code.

### 2. Open the terminal

Run:

```bash
npm install
```

This installs Express and Nodemon.

### 3. Start the server

For normal mode:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

You should see:

```text
Student Service API running at http://localhost:3000
```

## API Endpoints

| Method | URL | Purpose | Status |
|---|---|---|---|
| GET | `/students` | Get all students | 200 |
| GET | `/students/:id` | Get student by ID | 200 |
| POST | `/students` | Add student | 201 |
| PUT | `/students/:id` | Update student | 200 |
| DELETE | `/students/:id` | Delete student | 200 |

## Sample Student JSON

Use this body for POST and PUT requests:

```json
{
  "name": "Riya Singh",
  "age": 20,
  "course": "B.Tech CSE",
  "email": "riya@example.com"
}
```

Set the request header:

```text
Content-Type: application/json
```

## Postman Testing

### 1. Get all students

Method:

```text
GET
```

URL:

```text
http://localhost:3000/students
```

Expected status:

```text
200 OK
```

---

### 2. Get student by ID

Method:

```text
GET
```

URL:

```text
http://localhost:3000/students/1
```

Expected status:

```text
200 OK
```

---

### 3. Add a new student

Method:

```text
POST
```

URL:

```text
http://localhost:3000/students
```

Body -> raw -> JSON:

```json
{
  "name": "Riya Singh",
  "age": 20,
  "course": "B.Tech CSE",
  "email": "riya@example.com"
}
```

Expected status:

```text
201 Created
```

---

### 4. Update a student

Method:

```text
PUT
```

URL:

```text
http://localhost:3000/students/1
```

Body -> raw -> JSON:

```json
{
  "name": "Aarav Sharma Updated",
  "age": 21,
  "course": "B.Tech CSE",
  "email": "aarav.updated@example.com"
}
```

Expected status:

```text
200 OK
```

---

### 5. Delete a student

Method:

```text
DELETE
```

URL:

```text
http://localhost:3000/students/2
```

Expected status:

```text
200 OK
```

---

## Invalid Request Tests

### Student not found

```text
GET http://localhost:3000/students/999
```

Expected:

```text
404 Not Found
```

Example response:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student with ID 999 not found."
}
```

### Invalid student ID

```text
GET http://localhost:3000/students/abc
```

Expected:

```text
400 Bad Request
```

### Missing required fields

Method:

```text
POST
```

URL:

```text
http://localhost:3000/students
```

Body:

```json
{
  "name": "Test Student"
}
```

Expected:

```text
400 Bad Request
```

### Unsupported route

```text
GET http://localhost:3000/hello
```

Expected:

```text
404 Not Found
```

## Middleware

### Request Logger

`requestLogger.js` is applied globally and prints:

```text
[date/time] GET /students
```

### Validation Middleware

`validateStudent.js` is applied to POST and PUT requests.

It checks that:

- name is provided
- age is a positive integer
- course is provided
- email is provided

### Error Handler

`errorHandler.js` is the final middleware. It provides centralized JSON error responses.

## Important Note

This project uses an in-memory JavaScript array instead of a database.

Therefore, changes made using POST, PUT or DELETE will disappear when the server is restarted.

This is intentional for a basic Express CRUD lab. A database such as MongoDB or MySQL can be added in a later project.

## Quick Viva Points

### What is Express.js?

Express.js is a lightweight web framework for Node.js used to build web servers and REST APIs.

### What is CRUD?

CRUD means:

- Create -> POST
- Read -> GET
- Update -> PUT
- Delete -> DELETE

### What is middleware?

Middleware is a function that runs during the request-response cycle. It can inspect or modify the request/response or perform tasks before passing control to the next middleware.

### What is `/:id`?

It is a route parameter. For example:

```text
/students/5
```

Here, `5` is available as:

```javascript
req.params.id
```

### Why use `express.json()`?

It allows Express to read JSON data sent in the request body.

### Why use HTTP status codes?

They tell the client whether a request was successful or failed. For example, `200` means successful, `201` means created, `400` means bad request, `404` means not found, and `500` means server error.
