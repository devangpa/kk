// @route POST api/users/register
// @desc Register user
// @access Public

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

module.exports = (app) => {
  const usercontroller = require('../../controller/usercontroller');
  app.post('/api/users/register', usercontroller.registeruser);
  app.post('/api/users/login', usercontroller.loginuser);
  app.get('/api/users/getalluser', usercontroller.getallusers);
  app.get('/api/users/getuser/:id', usercontroller.getuserbyids);
};
