const Student = require("../models/Student.model");
const GradeService = require("../services/grade.service");



const createGrade = async (req, res, next) => {
    const {courseName, courseGrade, studentId} = req.body;

    // validate if student exist
    try {
        const student = await  Student.findByPk(studentId);
        if (!student) {
            res.status(404).json(`Student with id: ${studentId} not exist`);
        }

        const  grade = {
            courseName: courseName,
            courseGrade: courseGrade,
            studentId: studentId,
        }

        const newGrade = await GradeService.createNewGrade(grade);
        // 
        res.status(201).json(newGrade);
    
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}

const getGrade = async (req, res, next) => 
{
    const gradeId = req.params.id;
    try {
        const grade = await GradeService.getGradeById(gradeId);
        if (!grade) {
            return res.status(404)
            .json(`Grade with id: ${gradeId} not found`)
        }
        res.json(grade);
    }
    catch(error) {
        next(err);
    }
}

const updateGrade = async (req, res, next) => {
    const id = req.params.id;
    const { courseName, courseGrade, studentId } = req.body;
    try {
        const grade = await GradeService.getGradeById(id);

        if (!grade) {
            return res.status(404).json(`Grade with id: ${id} not found`);
        }


        const updatedGrade = {
            courseName: courseName,
            courseGrade: courseGrade,
            studentId: studentId,

        }

        const updatedGradeResults = await GradeService.updateGrade(id, updatedGrade);
        if (updatedGradeResults) {
            const updatedGrade = await GradeService.getGradeById(id);
            res.json(updatedGrade);
            // res.json(`Grade with id: ${id} updated`);
        }
        
    }

    catch (err) {
        console.log(err);
        next(err);
    }
    
}

const getAllGrades = async (req, res, next) => {
    try {
        const grades = await GradeService.getAllGrades();
        res.json(grades);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};




module.exports = { createGrade, getGrade, updateGrade, getAllGrades};