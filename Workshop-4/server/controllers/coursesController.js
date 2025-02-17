const Course = require("../models/coursesModel");
const Teacher = require("../models/teachersModel");

//Get all courses
const courseGet = async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500);
        res.json({ error: "Error fetching courses"});
    }
};