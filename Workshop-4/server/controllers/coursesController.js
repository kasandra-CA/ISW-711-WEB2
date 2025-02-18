const mongoose = require("mongoose");
const Course = require("../models/coursesModel");
const Teacher = require("../models/teachersModel");

//Get all courses
const courseGet = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacher", "first_name last_name");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: "Error fetching courses" });
    }
};


//Create an course
const coursePost = async (req, res) => {
    try {
        const { name, code, description, teacher } = req.body;

        // Validar que teacher sea un ObjectId válido antes de guardarlo
        if (!mongoose.Types.ObjectId.isValid(teacher)) {
            return res.status(400).json({ error: "Invalid teacher ID" });
        }

        const existingTeacher = await Teacher.findById(teacher);
        if (!existingTeacher) {
            return res.status(400).json({ error: "Teacher not found" });
        }

        // Asegurar que teacher se guarde como ObjectId
        const newCourse = new Course({
            name,
            code,
            description,
            teacher: new mongoose.Types.ObjectId(teacher)
        });
        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: "Error creating course" });
    }
};

// Update an course
const coursePut = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true }).populate("teacher", "first_name last_name");

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: "Error updating course" });
    }
};


//Delete an course
const courseDelete = async (req, res) => {
    try {
        const { id } = req.query;
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting course" });
    }
};

module.exports = { courseGet, coursePost, coursePut, courseDelete };