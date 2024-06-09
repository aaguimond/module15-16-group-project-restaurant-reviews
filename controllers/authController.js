const { User } = require('../models/User');
const bcrypt = require('bcrypt');

// Handling login
exports.login = async (req, res) => {
  try {
    // Uses the email in the login request to find the user email in our database
    const userData = await User.findOne({ where: { email: req.body.email } });
    // If no user data is found, return an error
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Check if the submitted password is valid compared to the one in our database
    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    // If the password is not valid, return and error
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // If the function doesn't encounter the errors above, save the user's logged in session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  // Error catching for the above
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Handling new user registration
exports.register = async (req, res) => {
  try {
    // Create new user from the data they submit
    const newUser = await User.create(req.body);
    // Save a logged in session for the user
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.json(newUser);
    });
  // Error catching for the above
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Handling logout
exports.logout = (req, res) => {
  // If the user has a logged in session,
  if (req.session.logged_in) {
    // We destroy that session,
    req.session.destroy(() => {
      // And return confirmation that the function worked
      res.status(204).end();
    });
  } else {
    // If not, return an error
    res.status(404).end();
  }
};