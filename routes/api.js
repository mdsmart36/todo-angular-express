var Todo = require('../models/todo');
var User = require('../models/user');
var router = express.Router();

/*
 * Serve JSON to our AngularJS client
 */

router.get("/tasks", function (req, res) {
  Todo.find({}, function (err, tasks) {

    // Loop over the tasks array and put in the username
    // instead of the _id for each task
    // for (var i = 0; i < tasks.length; i++) {
    //   tasks[i].user = theUser.username;
    // };

    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get task list");
    } else {
      res.json(tasks);
    }
  });
};

router.get("/user", function (req, res) {
  console.log('req.body._id',req.body);
  User.find({_id: req.body._id}, function (err, user) {
    if (!err) {
      res.json(user);
    } else {
      res.send("FAIL");
    }
  })
};

module.exports = router;
