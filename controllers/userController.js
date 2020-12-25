'use strict';

const User = require('../models/user');
const { check, validationResult } = require('express-validator');

exports.getSignUpPage = (req, res) => {
    res.render('signup', { 
        input: '',  
        error: ''
    });
};

exports.getSignInPage = (req, res) => {
  res.render('signin');
};

exports.validateUser = [
    check('name').not().isEmpty().withMessage('Name is required item'),
    check('email').not().isEmpty().withMessage('Email is required item').isEmail().withMessage('Email should have a valid syntax'),
    check('password').not().isEmpty().withMessage('Password is required item').isLength({ min: 7 }).withMessage('Password must be at least 7 chars long'),
    check('confirm')
        .custom((value, { req }) => {
            if(req.body.password !== req.body.confirm) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];

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
