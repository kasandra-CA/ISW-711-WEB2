const Teacher = require("../models/teachersModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = (req, res) => {
  let teacher = new Teacher();

  teacher.first_name = req.body.first_name;
  teacher.last_name = req.body.last_name;
  teacher.age = req.body.age;
  teacher.cedula = req.body.cedula;

  if (teacher.first_name && teacher.last_name) {
    teacher.save().then(() => {
      res.status(201);//CREATED
      res.header({
        'location': `/teachers/?id=${teacher.id}`
      });
      res.json(teacher);
    })
      .catch((err) => {
        res.status(422);
        console.log('error while saving the teacher', err);
        res.json({
          error: 'There was an error saving the teacher'
        });
      });
  } else {
    res.status(422);
    console.log('error while saving the teacher')
    res.json({
      error: 'No valid data provided for teacher'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Teachereacher.findById(req.query.id).then(teacher => {
      if (teacher) {
        res.json(teacher);
      }
      res.status(404);
      res.json({ error: "Task doesnt teacher" })
    })
      .catch((err) => {
        res.status(500);
        console.log('error while queryting the teacher', err)
        res.json({ error: "There was an error" })
      })
  } else {
    // get all teachers
    Teacher.find()
      .then(teacher => {
        res.json(teacher);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err })
      });
  }
};

/**
 * Updates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPatch = (req, res) => {
  // get teacher by id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "Teacher doesnt exist" })
      }

      // update the teacher object (patch)
      teacher.title = req.body.title ? req.body.title : teacher.title;
      teacher.detail = req.body.detail ? req.body.detail : teacher.detail;
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      teacher.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the teacher', err)
          res.json({
            error: 'There was an error saving the teacher'
          });
        }
        res.status(200); // OK
        res.json(teacher);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Teacher doesnt exist" })
  }
};


/**
 * Updates a teacher (PUT)
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPut = async (req, res) => {
  try {
      const { id } = req.query;
      const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedTeacher) {
          return res.status(404).json({ error: "Teacher not found" });
      }

      res.json(updatedTeacher);
  } catch (error) {
      res.status(500).json({ error: "Error updating teacher" });
  }
};


/**
 * Deletes a teacher (DELETE)
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = (req, res) => {
  if (req.query && req.query.id) {
    Teacher.findByIdAndDelete(req.query.id)
      .then((teacher) => {
        if (!teacher) {
          res.status(404);
          return res.json({ error: "Teacher not found" });
        }
        res.status(200).json({ message: "Teacher deleted successfully" });
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: "Error deleting teacher" });
      });
  } else {
    res.status(400).json({ error: "ID is required" });
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPut,
  teacherDelete
}