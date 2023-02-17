var express = require("express");
const { Op, fn } = require("sequelize");
var router = express.Router();
const { Sequelize, sequelize } = require("../database/db");
const { validateNewUserInput } = require("../middlewares/Validations");
const Student = require("../models/Student.model");
const Grade = require("../models/Grade.model");

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

router.get("/filter", async function (req, res, next) {
  // filter sorting and pagination

  // fields = {"s.id": "id", "s.firstName": "firstName", "s.lastName": "lastName", "s.birthday": "birthday", "s.phone": "phone", "s.satScore": "satScore", "s.graduationScore": "graduationScore"};
  fields = [
    "id",
    "firstName",
    "lastName",
    "birthday",
    "phone",
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
  // console.log(sql);
  // res.send(sql);

  Student.sequelize
    .query(sql, { replacements: params, type: sequelize.QueryTypes.SELECT })
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  Student.findByPk(id)
    .then((student) => {
      if (student) {
        return res.json(student);
      }
      return res
        .status(404)
        .json({ error: `Student with id: ${id} not found` });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/new", validateNewUserInput, async function (req, res, next) {
  const { firstName, lastName, birthday, phone, satScore, graduationScore } =
    req.body;
  // parse string to date
  const date = new Date(birthday).toUTCString();
  console.log(date);
  const studentData = {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    phone: phone,
    satScore: satScore,
    graduationScore: graduationScore,
  };

  try {
    const newStudent = await Student.create(studentData);
    res.status(201).json(newStudent);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  Student.destroy({
    where: {
      id: id,
    },
  })
    .then((student) => {
      if (student) {
        return res.json({ message: `Student with id: ${id} deleted` });
      }
      return res
        .status(404)
        .json({ error: `Student with id: ${id} not found` });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.put("/:id",validateNewUserInput ,async function (req, res, next) {
  const id = req.params.id;
  const { firstName, lastName, birthday, phone, satScore, graduationScore } =
    req.body;
  // validate student exists
  Student.findByPk(id)
    .then((student) => {
      if (!student) {
        return res
          .status(404)
          .json({ error: `Student with id: ${id} not found` });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

  const studentData = {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    phone: phone,
    satScore: satScore,
    graduationScore: graduationScore,
  };
  Student.update(studentData, { where: { id: id } })
    .then((student) => {
      if (student) {
        console.log(student);
        return res.json({ message: `Student with id: ${id} updated` });
      }
    
    }
    )
});

module.exports = router;
