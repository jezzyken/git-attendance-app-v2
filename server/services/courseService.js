const Course = require("../models/Course");

const createCourse = async (courseData) => {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    throw error;
  }
};

const getAllCourses = async () => {
  try {
    return await Course.find({});
  } catch (error) {
    throw error;
  }
};

const getCourseById = async (courseId) => {
  try {
    return await Course.findById(courseId);
  } catch (error) {
    throw error;
  }
};

const getCourseByName = async (courseName) => {
  try {
    return await Course.findOne({ courseName });
  } catch (error) {
    throw error;
  }
};

const updateCourse = async (courseId, updateData) => {
  try {
    return await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw error;
  }
};

const deleteCourse = async (courseId) => {
  try {
    return await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseByName,
  updateCourse,
  deleteCourse,
};
