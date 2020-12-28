'use strict';

const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getSignUpPage = (req, res) => {
    res.render('signup', { 
        input: '',  
        error: ''
    });
};

exports.getSignInPage = (req, res) => {
  res.render('signin');
};

exports.saveUser = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('signup', { 
            input: req.body,
            error: errors.array()[0].msg });
    }
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser
        .save()
            .then(() => {
                res.render('dashboard', {
                    user: newUser
                });
            })
            .catch(() => {
                res.render('signup', {
                    input: req.body,
                    error: 'Email is already in use'
                });
            });
};
