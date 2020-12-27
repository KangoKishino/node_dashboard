'use strict';

const { check } = require('express-validator');

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