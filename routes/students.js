var express = require("express");
const { Op, fn } = require("sequelize");
var router = express.Router();
const { Sequelize, sequelize } = require("../database/db");
const { validateNewUserInput, validateNewStudentInput } = require("../middlewares/Validations");
const Student = require("../models/Student.model");
const Grade = require("../models/Grade.model");
const StudentController = require("../controller/Student.Controller");

/* GET students listing. */
router.get("/", async function (req, res, next) {
  Student.findAll()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/filter", 
StudentController.filterStudents
);

router.get(
  "/:id",
  StudentController.GetStudentById

);

router.post(
  "/new",
  validateNewStudentInput,
  StudentController.createNewStudent

);

router.delete(
  "/:id",
  StudentController.DeleteStudent

);

router.put(
  "/:id",
  validateNewUserInput,
  StudentController.UpdateStudent

);

module.exports = router;
