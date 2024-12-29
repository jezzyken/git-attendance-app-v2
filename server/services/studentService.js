const Student = require("../models/Student");
const User = require("../models/User");
const AppError = require("../utils/appError");

const createStudent = async (data) => {

  let createdUser = null;

  try {
    const userData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNo: data.phoneNo,
      roles: "student",
      email: null,
      username: null,
    };

    createdUser = await User.create(userData);

    const studentData = {
      user: createdUser._id,
      studentId: data.studentId,
      course: data.course,
      level: data.level,
      section: data.section,
      parentName: data.parentName,
      parentNo: data.parentNo,
      parentAddress: data.parentAddress,
      parentEmail: data.parentEmail,
    };

    const student = await Student.create(studentData);

    return await Student.findById(student._id)
      .populate("user", "-password")
      .populate("course");
  } catch (error) {

    console.log(error)
    if (createdUser) {
      await User.findByIdAndDelete(createdUser._id);
    }

    if (error.code === 11000) {
      throw new AppError('Student ID already exists', 400);
    }
    throw error;
  }
};

const getAllStudents = async () => {
  const students = await Student.find()
    .populate("user", "-password")
    .populate("course")
    .sort("-createdAt");
  return students;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id)
    .populate("user", "-password")
    .populate("course");

  if (!student) {
    throw new AppError("Student not found", 404);
  }
  return student;
};

const updateStudent = async (id, data) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new AppError("Student not found", 404);
    }

    if (
      data.firstName ||
      data.middleName ||
      data.lastName ||
      data.dateOfBirth ||
      data.gender ||
      data.phoneNo
    ) {
      await User.findByIdAndUpdate(student.user, {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phoneNo: data.phoneNo,
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        studentId: data.studentId,
        course: data.course,
        level: data.level,
        section: data.section,
        parentName: data.parantName,
        parentNo: data.parentNo,
        parentAddress: data.parentAddress,
        parentEmail: data.parentEmail,
      },
      { new: true, runValidators: true }
    )
      .populate("user", "-password")
      .populate("course");

    return updatedStudent;
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Student ID already exists", 400);
    }
    throw error;
  }
};

const deleteStudent = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  await Promise.all([
    Student.findByIdAndDelete(id),
    User.findByIdAndDelete(student.user),
  ]);

  return true;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
