const Subject = require("../models/Subject");

const createSubject = async (subjectData) => {
  try {
    const subject = new Subject(subjectData);
    await subject.save();
    return await subject.populate("course");
  } catch (error) {
    throw error;
  }
};

const getAllSubjects = async () => {
  try {
    return await Subject.find().populate("course");
  } catch (error) {
    throw error;
  }
};

const getSubjectById = async (subjectId) => {
  try {
    return await Subject.findById(subjectId).populate("course");
  } catch (error) {
    throw error;
  }
};

const getSubjectByName = async (subjectName) => {
  try {
    return await Subject.findOne({ subjectName }).populate("course");
  } catch (error) {
    throw error;
  }
};

const updateSubject = async (subjectId, updateData) => {
  try {
    return await Subject.findByIdAndUpdate(subjectId, updateData, {
      new: true,
      runValidators: true,
    }).populate("course");
  } catch (error) {
    throw error;
  }
};

const deleteSubject = async (subjectId) => {
  try {
    return await Subject.findByIdAndDelete(subjectId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectByName,
  updateSubject,
  deleteSubject,
};
