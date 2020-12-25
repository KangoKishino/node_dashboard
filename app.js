'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost:27017/laravel_db',
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', userController.getSignUpPage);
app.get('/signin', userController.getSignInPage);
app.post('/dashboard', userController.validateUser, userController.saveUser);

app.listen(3000);