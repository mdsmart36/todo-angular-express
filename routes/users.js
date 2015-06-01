var express = require('express');
var app = express.Router();
var UserController = require("../userController");
var UserModel = require("../models/user");

// Handle the registration form post
app.post("/register", function (req, res) {
  var newUser = new UserModel(req.body);

  newUser.save(function (err, user) {
    if (err) {
      res.status(500).send(JSON.stringify(err.errors));
    } else {
      res.send("SUCCESS");
    }
  });
});

app.get("/", function (req, res) {
  var user = UserController.getCurrentUser();

  if (user === null) {
    res.status(403).send('Not authenticated');
  }

  res.status(200).json(user);

});


// Handle the login action
app.post("/login", function (req, res) {
  // Attempt to log the user is with provided credentials
  UserController.login(req.body.username, req.body.password)

    // After the database call is complete and successful,
    // the promise returns the user object
    .then(function (validUser) {
      res.status(200).json(validUser);
    })

    // After the database call is complete but failed
    .fail(function (err) {
      res.status(500).send(JSON.stringify(err.errors));
    })
});

app.get("/logout", function (req, res) {
  UserController.logout();
  res.status(200).json("SUCCESS")
});

module.exports = app;
