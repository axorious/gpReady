const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/role");

// register

async function register(login, password) {
  if (!login) {
    throw new Error("Login is empty");
  }

  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ login, password: passwordHash });
    const token = generate({ id: user._id });
    return { user, token };
  } catch (e) {
    if (e.code === 11000) {
      throw new Error("This login is already taken");
    }
    throw e;
  }
}

// login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { user, token };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.BUYER, name: "Moderator" },
    { id: ROLES.GUEST, name: "User" },
  ];
}

// delete

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

// edit(roles)

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
