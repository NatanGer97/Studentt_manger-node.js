const { sequelize } = require("../database/db");
const Student = require("../models/Student.model");
const StudentService = require("../services/Student.Service");

const createNewStudent = async (req, res, next) => {
  const { firstName, lastName, birthday, email, satScore, graduationScore } =
    req.body;
  const student = {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    email: email,
    satScore: satScore,
    graduationScore: graduationScore,
  };
  try {
    const newStudent = await StudentService.createStudent(student);
    res.status(201).json(newStudent);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

async function GetStudentById(req, res, next) {
  const id = req.params.id;
  try {
    const student = await StudentService.GetStudentById(id);
    if (!student) {
      return res.status(404).json(`Student with id: ${id} not found`);
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
}

async function UpdateStudent(req, res, next) {
  const id = req.params.id;
  const { firstName, lastName, birthday, phone, satScore, graduationScore } =
    req.body;
  const student = {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    phone: phone,
    satScore: satScore,
    graduationScore: graduationScore,
  };
  try {
    const updatedStudent = await StudentService.updateStudent(id, student);
    if (!updatedStudent) {
      return res.status(404).json(`Student with id: ${id} not found`);
    }
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
}

async function DeleteStudent(req, res, next) {
  const id = req.params.id;
  try {
    const deletedStudent = await StudentService.deleteStudent(id);
    if (!deletedStudent) {
      return res.status(404).json(`Student with id: ${id} not found`);
    }
    res.json(deletedStudent);
  } catch (err) {
    next(err);
  }
}

async function filterStudents(req, res, next) {
  fields = [
    "id",
    "firstName",
    "lastName",
    "birthday",
    "email",
    "satScore",
    "graduationScore",
  ];
  const {
    firstName,
    lastName,
    satScoreFrom,
    satScoreTo,
    graduationScoreFrom,
    graduationScoreTo,
    pageSize = 10,
    pageNumber = 1,
  } = req.query;

  let from_str = " FROM students s ";
  let where_str = " WHERE 1=1 ";

  if (firstName) {
    where_str += " AND s.lastName LIKE '%" + lastName + "%' ";
  }
  if (lastName) {
    where_str += " AND s.lastName LIKE '%" + lastName + "%' ";
  }
  if (satScoreFrom) {
    where_str += " AND   s.satScore >= " + satScoreFrom + " ";
  }
  if (satScoreTo) {
    where_str += " AND s.satScore <= " + satScoreTo + " ";
  }
  if (graduationScoreFrom) {
    where_str += " AND s.graduationScore >= " + graduationScoreFrom + " ";
  }
  if (graduationScoreTo) {
    where_str += " AND s.graduationScore <= " + graduationScoreTo + " ";
  }

  params = {
    satScoreFrom: satScoreFrom,
    satScoreTo: satScoreTo,
    graduationScoreFrom: graduationScoreFrom,
    graduationScoreTo: graduationScoreTo,
    firstName: firstName,
    lastName: lastName,
  };

  let select_str = "select ";
  for (const key in fields) {
    select_str += "s." + fields[key] + " as " + fields[key] + ", ";
  }
  select_str +=
    " (select avg(g.courseGrade) from grades as g where g.studentId = s.id) as avgGrade, ";

  let ob = " order by ";
  if (req.query.orderBy) {
    ob += req.query.orderBy;
  } else {
    ob += "s.id";
  }
  if (req.query.orderDirection) {   
    ob += " " + req.query.orderDirection;
  } else {
    ob += " ASC";
  }

  sql = select_str.slice(0, -2) + from_str + where_str + ob;
  // pagination
    if (pageNumber && pageSize) {
        
        
        sql += " LIMIT " + (parseInt(pageNumber) - 1) * parseInt(pageSize) + ", " + parseInt(pageSize);
    }


  Student.sequelize
    .query(sql, { replacements: params, type: sequelize.QueryTypes.SELECT })
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  createNewStudent,
  GetStudentById,
  UpdateStudent,
  DeleteStudent,
  filterStudents,
};
