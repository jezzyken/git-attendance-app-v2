const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const AppError = require("../utils/appError");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const login = async (email, password) => {
  console.log(email, password);

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  user.password = undefined;

  let teacher = null;

  if (user.roles === "teacher") {
    teacher = await Teacher.findOne({ user: user._id });
  }

  const token = generateToken(user);

  return {
    user,
    token,
    teacher,
  };
};

module.exports = {
  login,
  generateToken,
};
