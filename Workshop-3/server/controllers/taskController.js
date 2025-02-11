const Task = require("../models/taskModel");

/**
 * Creates a task
 *
 * @param {*} req
 * @param {*} res
 */
const taskPost = (req, res) => {
  let task = new Task();

  task.first_name = req.body.first_name;
  task.last_name = req.body.last_name;
  task.age = req.body.age;
  task.cedula = req.body.cedula;

  if (task.first_name && task.last_name) {
    task.save().then(() => {
      res.status(201);//CREATED
      res.header({
        'location': `/tasks/?id=${task.id}`
      });
      res.json(task);
    })
      .catch((err) => {
        res.status(422);
        console.log('error while saving the task', err);
        res.json({
          error: 'There was an error saving the task'
        });
      });
  } else {
    res.status(422);
    console.log('error while saving the task')
    res.json({
      error: 'No valid data provided for task'
    });
  }
};

/**
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
const taskGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Task.findById(req.query.id).then(task => {
      if (task) {
        res.json(task);
      }
      res.status(404);
      res.json({ error: "Task doesnt exist" })
    })
      .catch((err) => {
        res.status(500);
        console.log('error while queryting the task', err)
        res.json({ error: "There was an error" })
      })
  } else {
    // get all tasks
    Task.find()
      .then(task => {
        res.json(task);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err })
      });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
/**const taskPatch = (req, res) => {
  // get task by id
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err) {
        res.status(404);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }

      // update the task object (patch)
      task.title = req.body.title ? req.body.title : task.title;
      task.detail = req.body.detail ? req.body.detail : task.detail;
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      task.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the task', err)
          res.json({
            error: 'There was an error saving the task'
          });
        }
        res.status(200); // OK
        res.json(task);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Task doesnt exist" })
  }
};*/


/**
 * Updates a task (PUT)
 *
 * @param {*} req
 * @param {*} res
 */
const taskPut = (req, res) => {
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err || !task) {
        res.status(404);
        return res.json({ error: "Task doesn't exist" });
      }

      // Overwrite all properties
      task.first_name = req.body.first_name;
      task.last_name = req.body.last_name;
      task.age = req.body.age;
      task.cedula = req.body.cedula;

      task.save(function (err) {
        if (err) {
          res.status(422);
          return res.json({ error: 'Error updating the task' });
        }
        res.status(200);
        res.json(task);
      });
    });
  } else {
    res.status(400).json({ error: "ID is required" });
  }
};

/**
 * Deletes a task (DELETE)
 *
 * @param {*} req
 * @param {*} res
 */
const taskDelete = (req, res) => {
  if (req.query && req.query.id) {
    Task.findByIdAndDelete(req.query.id)
      .then((task) => {
        if (!task) {
          res.status(404);
          return res.json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: "Error deleting task" });
      });
  } else {
    res.status(400).json({ error: "ID is required" });
  }
};

module.exports = {
  taskGet,
  taskPost,
  taskPut,
  taskDelete
}