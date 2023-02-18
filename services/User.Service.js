const User = require("../models/User.model");

const bcrypt = require("bcryptjs");

async function createUser(user) {
  const { firstName, lastName, email, password } = user;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const savedUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    return savedUser;
  } catch (err) {
    throw err;
  }
};

module.exports = {createUser,};
