// Making sure users are logged in to access site functionality
const withAuth = (req, res, next) => {
  // If user doesn't have a logged in session,
  if (!req.session || !req.session.logged_in) {
    // redirect them to the login page
    return res.redirect('/login');
  // If they are logged in,
  } else {
    // continue with the next function
    next();
  }
};
  
module.exports = withAuth;