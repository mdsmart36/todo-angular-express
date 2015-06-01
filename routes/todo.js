var UserController = require('../userController');
var express = require('express');
var router = express.Router();
var todoList = [];

// Include the model for a Todo that we set up in Mongoose
var Todo = require('../models/todo');

// Send the error message back to the client
var sendError = function (req, res, err, message) {
  res.status(500).send(JSON.stringify(err.errors));
};

// Handle a GET request from the client to /todo/list
router.get('/', function (req,res,next) {
  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.status(403).send('Not authenticated');
  }

  var theUser = UserController.getCurrentUser();

  Todo.find({user: theUser._id}, function (err, tasks) {

    console.log('tasks',tasks);

    // instead of the _id for each task
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].user = theUser.username;
    };

    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get task list");
    } else {
      res.json(tasks);
    }
  });
});

// Handle a GET request from the client to /todo/:id
router.get('/:id', function (req, res) {

  // Is the user logged in?
  if (UserController.getCurrentUser() === null) {
    res.status(403).send('Not authenticated');
  }

  Todo.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      sendError(req, res, err, "Could not find a task with that id");

    // Find was successful
    } else {
      res.json(item);
    }
  });
});

// Handle a DELETE request from the client to /todo
router.delete('/:id', function (req, res) {
  Todo.find({ _id: req.params.id })
      .remove(function (err) {

    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the task");

    // Delete was successful
    } else {
      res.status(200).send('SUCCESS');
    }
  });
});

// Handle a POST request from the client to /todo
router.post('/', function (req, res, next) {

  if (UserController.getCurrentUser() === null) {
    res.status(403).send('Not authenticated');
  }

  // Who is the user?
  var theUser = UserController.getCurrentUser();

  // What did the user enter in the form?
  var theFormPostData = req.body
  theFormPostData.user = theUser._id;

  console.log('theFormPostData',theFormPostData);


  var mytodo = new Todo(theFormPostData);

  mytodo.save(function (err, todo) {
    if (err) {
      sendError(req, res, err, "Failed to save task");
    } else {
      res.status(200).send('SUCCESS');
    }
  });

});

module.exports = router;
