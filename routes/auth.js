const router = require("express").Router();
const AuthController = require("../controller/Auth.Controller");
const {
  validateNewUserInput,
  validateLoginInput,
} = require("../middlewares/Validations");

router.post("/register", validateNewUserInput, AuthController.registerUser);

router.post("/login", validateLoginInput, AuthController.login);

module.exports = router;
