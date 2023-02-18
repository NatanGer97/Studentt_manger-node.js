const Joi = require('joi');

module.exports.NewStudentSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(60),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    birthday: Joi.date().required(),
    satScore: Joi.number().required(),
    graduationScore: Joi.number().required(),

});

module.exports.NewGradeSchema = Joi.object({
    courseName: Joi.string().required(),
    courseGrade: Joi.number().required().min(1).max(100),
    studentId: Joi.number().required(),

});


module.exports.NewUserSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(60),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(60),

});

module.exports.loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(60),
});