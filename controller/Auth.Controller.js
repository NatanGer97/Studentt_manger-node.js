const User = require("../models/User.model");
const UserService = require("../services/User.Service");

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // validate user is not already existing
  User.findOne({ where: { email: email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });

  // create user
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  try {
    const newUser = await UserService.createUser(user);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = { registerUser, };
