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

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({where: {email: email}});
        return user;
    }
    catch (err) {
        throw err;
    }

};

module.exports = {createUser,  getUserByEmail};
