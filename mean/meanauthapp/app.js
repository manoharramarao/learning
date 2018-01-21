const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
// on success
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('Connection failed ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

// all middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// users route
app.use('/users', users);

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// index route
app.get('/', (req, res) => {
    res.send('Dummy Endpoint for now');
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});