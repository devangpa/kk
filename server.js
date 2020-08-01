const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const morgan = require('morgan');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));
// Passport middleware
app.use(passport.initialize());
app.use(morgan('dev'));
// Passport config
require('./config/passport')(passport);
require('./routes/api/users')(app);
require('./routes/api/job')(app);
// Routes
// app.use('/api/users', users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
