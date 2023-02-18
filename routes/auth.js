const router = require("express").Router();
const AuthController = require("../controller/Auth.Controller");
const { validateNewUserInput } = require("../middlewares/Validations");

router.post(
  "/register",
    validateNewUserInput,
  AuthController.registerUser
);


module.exports = router;