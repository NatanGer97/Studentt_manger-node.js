const Grade = require("../models/Grade.model");
const StudentService = require("../services/Student.Service");
const EmailService = require("../services/Email.Service");

async function getGradeById(gradeId) {
  // return grade by id
  try {
    const grade = await Grade.findByPk(gradeId);
    console.log(grade);
    return grade;
  } catch (err) {
    console.log("Error in getGradeById in services/grade.service.js");
    console.error(err);
    throw err;
  }
}

const getAllGrades = async () => {
  // return all grades
  try {
    const grades = await Grade.findAll();
    return grades;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getGradesByStudentId = async (studentId) => {
  // return grades by student id
  try {
    const grades = await Grade.findAll({
      where: {
        studentId: studentId,
      },
    });
    return grades;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteGrade = async (gradeId) => {
  // delete grade by id
  Grade.destroy({ where: { id: gradeId } })
    .then((result) => {
      if (result) {
        return result;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const createNewGrade = async (grade) => {
  // create new grade
  try {
    const newGrade = await Grade.create(grade);
    // send an update email to student
    const student = await StudentService.GetStudentById(grade.studentId);
    const email = student.email;
    const message = `Your grade for ${grade.courseName} is ${grade.courseGrade}`;
    const subject = "Grade Update";
    
    await EmailService.sendEmail(email, message, subject);

    return newGrade;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateGrade = async (gradeId, grade) => {
  // update grade by id
  try {
    const updatedGrade = await Grade.update(grade, { where: { id: gradeId } });
    return updatedGrade;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getAllGrades,
  getGradeById,
  getGradesByStudentId,
  deleteGrade,
  createNewGrade,
  updateGrade,
};
