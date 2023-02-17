const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('students_manager', 'root', 'root',{host:'localhost', dialect:'mysql'});
// const sequelize = new Sequelize('postgres://postgres:postgres@postgres:5432/students_manager');

exports.sequelize = sequelize;