const Student = require("../models/Student.model");


async function GetStudentById(studentId) {
    try {
        const student = await Student.findByPk(studentId);
        return student;
    } catch (err) {
        console.log(err);
        throw err;
    }
}



const deleteStudent = async (studentId) => {
    // delete student by id
    Student.destroy({ where: { id: studentId } })
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

const createStudent = async (student) => {
    // create new student
    try {
        const newStudent = await Student.create(student);
        return newStudent;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const updateStudent = async (studentId, student) => {
    // update student by id
    try {
        const updatedStudent = await Student.update(student, {
            where: { id: studentId },
        });
        return updatedStudent;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    GetStudentById, 
    deleteStudent,
    createStudent,
    updateStudent,
};