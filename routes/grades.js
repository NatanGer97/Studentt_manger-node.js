const router = require("express").Router();
const { sequelize } = require("../database/db");

const Student = require("../models/Student.model");
const Grade = require("../models/Grade.model");
const { validateNewGradeInput } = require("../middlewares/Validations");
const GradeController = require("../controller/Grade.Controller");
/**
 * @swagger
 *  components:
 *    schemas:
 *      Grade:
 *        type: object
 *        required:
 *          - courseName
 *          - courseGrade
 *          - studentId
 *        properties:
 *          id:
 *            type: number
 *            description: The auto-generated id
 *          courseName:
 *            type: string
 *            description: The course name
 *          courseGrade:
 *            type: number
 *            description: the course grade
 *          studentId:
 *            type: number
 *            description: the student id
 *        example:
 *          courseName: Math
 *          courseGrade: 90
 *          studentId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Grades
 *  description: User Grades management
 *
 */

/**
 * @swagger
 *   /grades:
 *     get:
 *       summary: Returns the list of all the grades
 *       tags: [Grades]
 *       responses:
 *         "200":
 *           description: A list of grades
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Grade'
 *         "500":
 *           description: Server error
 *         "404":
 *           description: No grades found
 */
router.get("/", GradeController.getAllGrades);
router.get("/student", async (req, res, next) => {
  const { studentId } = req.query;

  // validate id student
  Student.findByPk(studentId)
    .then((student) => {
      if (!student) {
        console.log("student not found");
        return res
          .status(404)
          .json({ error: `Student with id: ${studentId} not found` });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

  try {
    const grades = await Grade.findAll({
      where: {
        studentId: req.query.studentId,
      },
    });

    if (grades) {
      return res.json(grades);
    }
    return res
      .status(404)
      .json({ error: `Grades with studentId: ${studentId} not found` });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/**
 * @swagger
 * /grades/{id}:
 * get:
 *   summary: Get the grade by id
 *   tags: [Grades]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The grade id
 *   responses:
*     "200":
  *       description: The grade description by id
  *       content:
  *        application/json:
  *          schema:
  *           $ref: '#/components/schemas/Grade'
  *   "404":
  *    description: The grade was not found
  * 
 *     
 * */
router.get("/:id", GradeController.getGrade);
/**
 * @swagger
 * /grades/student:
 *  get:
 *   summary: Get the grade by student id
 *   tags: [Grades]
 *   parameters:
 *   - in: query
 *    name: studentId
 *    schema:
  *    type: string
  *   required: true
  *  description: The student id
  * responses:
  *  "200":
  *   description: The grade description by student id
  *   content:
  *   application/json:
  *   schema:
  *     type: array
  *      items:     
   *      $ref: '#/components/schemas/Grade'
   * "404":
   *  description: The grade was not found
   * 
 */

router.post("/new", validateNewGradeInput, GradeController.createGrade);
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  Grade.destroy({
    where: {
      id: id,
    },
  }).then((grade) => {
    if (grade) {
      return res.json({ message: `Grade with id: ${id} deleted` });
    }
    return res.status(404).json({ error: `Grade with id: ${id} not found` });
  });
});

router.put("/:id", validateNewGradeInput, GradeController.updateGrade);

module.exports = router;
