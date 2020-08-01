const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
// Load User model
const User = require('../model/User');

exports.registeruser = async (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email}).then((user) => {
    if (user) {
      return res.status(400).json({email: 'Email already exists'});
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.loginuser = async (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({email}).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({emailnotfound: 'Email not found'});
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              User: user.role,
            });
          }
        );
      } else {
        return res.status(400).json({passwordincorrect: 'Password incorrect'});
      }
    });
  });
};

exports.getallusers = async (req, res) => {
  try {
    const datatobesend = await User.find({});
    const name = datatobesend.map((data) => {
      const returobj = {
        name: data.name,
        email: data.email,
        id: data._id,
        Membersince: data.date,
      };

      return returobj;
    });
    res.status(200).send({message: 'Get all user', data: name});
  } catch (error) {
    res
      .status(400)
      .send({message: 'Not abote to find a any freelancer for you'});
  }
};

exports.getuserbyids = async (req, res) => {
  const id = req.params.id;
  try {
    const datatobesend = await User.findById(id);

    const returobj = {
      name: datatobesend.name,
      email: datatobesend.email,
      id: datatobesend._id,
      membersince: datatobesend.date,
    };

    res.status(200).send({message: 'Get a user', data: returobj});
  } catch (error) {
    res.status(400).send({message: 'Detail is not available'});
  }
};
