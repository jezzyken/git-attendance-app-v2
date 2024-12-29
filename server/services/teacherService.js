const Teacher = require("../models/Teacher");
const User = require("../models/User");
const AppError = require("../utils/appError");

const createTeacher = async (data) => {
  let createdUser = null;

  try {
    let userId;

    const userData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNo: data.phoneNo,
      roles: "teacher",
    };

    if (data.existingUserId) {
      userId = data.existingUserId;
      await User.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true,
      });
    } else {
      const newUserData = {
        ...userData,
        email: data.email,
        username: data.username,
        password: data.password,
      };

      createdUser = await User.create(newUserData);
      userId = createdUser._id;
    }

    const teacherData = {
      user: userId,
      teacherId: data.teacherId,
      department: data.department,
      subjects: data.subjects,
      employmentDate: data.employmentDate,
    };

    const teacher = await Teacher.create(teacherData);

    return await Teacher.findById(teacher._id)
      .populate("user", "-password")
      .populate("department")
      .populate("subjects");
  } catch (error) {
    if (createdUser) {
      await User.findByIdAndDelete(createdUser._id);
    }

    if (error.code === 11000) {
      if (error.keyPattern.email) {
        throw new AppError("Email already exists", 400);
      }
      if (error.keyPattern.username) {
        throw new AppError("Username already exists", 400);
      }
      if (error.keyPattern.teacherId) {
        throw new AppError("Teacher ID already exists", 400);
      }
    }
    throw error;
  }
};

const getAllTeachers = async () => {
  const teachers = await Teacher.find()
    .populate("user", "-password")
    .populate("department")
    .populate("subjects")
    .sort("-createdAt");
  return teachers;
};

const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id)
    .populate("user", "-password")
    .populate("department")
    .populate("subjects");

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }
  return teacher;
};

const updateTeacher = async (id, data) => {
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      throw new AppError("Teacher not found", 404);
    }

    const userData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNo: data.phoneNo,
    };

    if (data.email) userData.email = data.email;
    if (data.username) userData.username = data.username;

    await User.findByIdAndUpdate(teacher.user, userData, {
      runValidators: true,
    });

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        teacherId: data.teacherId,
        department: data.department,
        subjects: data.subjects,
        employmentDate: data.employmentDate,
      },
      { new: true, runValidators: true }
    )
      .populate("user", "-password")
      .populate("department")
      .populate("subjects");

    if (!updatedTeacher) {
      throw new AppError("Teacher not found", 404);
    }

    return updatedTeacher;
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        throw new AppError("Email already exists", 400);
      }
      if (error.keyPattern.username) {
        throw new AppError("Username already exists", 400);
      }
    }
    throw error;
  }
};

const deleteTeacher = async (id) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  await Promise.all([
    Teacher.findByIdAndDelete(id),
    User.findByIdAndDelete(teacher.user),
  ]);

  return true;
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
