const {sequelize} = require('../database/db');
const {DataTypes} = require('sequelize');
const Grade = require('./Grade.model');


const Student = sequelize.define('students' ,{
    firstName: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true} },
    lastName: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
    birthday: {type: DataTypes.DATEONLY, allowNull: false,},
    phone:{type: DataTypes.STRING, allowNull: false, },
    satScore: {type: DataTypes.INTEGER, allowNull: false,},
    graduationScore: {type: DataTypes.INTEGER,}

});

Student.hasMany(Grade);
Grade.belongsTo(Student);
module.exports = Student;