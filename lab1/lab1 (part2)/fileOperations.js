const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

/* 
    I will only use GET method at the moment to test from browser easily
*/

//Testing reading a file using asynchronous
//None blocking method, requires a callback function to be executed when the file has been read.
app.get("/fileAsync", (req, res) => {
  fs.readFile("students.json", (error, data) => {
    return res.status(200).json(JSON.parse(data));
  });
  //Do something here until the file reading is done
  console.log(12);
});

//Testing reading a file using synchronous
//Blocks the code until the file is fully read
app.get("/fileSync", (req, res) => {
  const data = fs.readFileSync("students.json", "utf-8");
  //Code is blocked until the above line finishes
  return res.status(200).json(JSON.parse(data));
});

//Write the studentData to students.json
//Add new student
app.get("/add/:name", (req, res) => {
  //Get user name
  const username = req.params.name;
  //Read DB
  const data = fs.readFileSync("students.json", "utf-8");
  const students = JSON.parse(data);
  //Add user into database (only name at the moment)
  students.push({
    name: username,
    // id: 0,
    // age: 0,
    // course: "",
    // grades: {
    //   html: 0,
    //   javascript: 0,
    // },
  });
  fs.writeFileSync("students.json", JSON.stringify(students));
  return res
    .status(201)
    .json({ status: true, message: "User added successfully" });
});

//Read users
app.get("/list", (req, res) => {
  const data = fs.readFileSync("students.json", "utf-8");
  //Code is blocked until the above line finishes
  return res.status(200).json(JSON.parse(data));
});

//BONUS
//Update a student's course
app.get("/update/:uid/:course", (req, res) => {
  //get student id
  const uid = req.params.uid;
  //get student new course
  const course = req.params.course;
  //Read DB
  const data = fs.readFileSync("students.json", "utf-8");
  const students = JSON.parse(data);
  //Update student by ID
  let hasUpdated = false;
  students.map((student, index) => {
    if (student.id == uid) {
      student.course = course;
      hasUpdated = true;
    }
  });
  if (hasUpdated) {
    fs.writeFileSync("students.json", JSON.stringify(students));
    return res
      .status(201)
      .json({ status: true, message: "User updated successfully" });
  } else {
    return res
      .status(400)
      .json({ status: false, message: "User doesn't exist" });
  }
});

//Delete spesfic student
app.get("/delete/:uid", (req, res) => {
  //get student id
  const uid = req.params.uid;
  //Read DB
  const data = fs.readFileSync("students.json", "utf-8");
  const students = JSON.parse(data);
  //delete student
  let hasUpdated = false;
  students.map((student, index) => {
    if (student.id == uid) {
      students.splice(index, 1);
      hasUpdated = true;
    }
  });
  if (hasUpdated) {
    fs.writeFileSync("students.json", JSON.stringify(students));
    return res
      .status(201)
      .json({ status: true, message: "User deleted successfully" });
  } else {
    return res
      .status(400)
      .json({ status: false, message: "User doesn't exist" });
  }
});

//Compare the behavior of sync vs async operations
//As sync blocks the code until the file operation is compeleted then it executes the next lines
//Async move on with the code regardless the file read is completed or not (file operation takes a callback to be executed once compeleted)

app.listen(3000);
