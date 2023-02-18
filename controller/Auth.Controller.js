const User = require("../models/User.model");
const UserService = require("../services/User.Service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // create token
    const tokenPayload ={id: user.id, email: user.email};

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: '10m'});

    return res.status(200).json({token: token});

  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, login };
