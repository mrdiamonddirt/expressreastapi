const bcrypt = require('bcryptjs');
const User = require('../user/userModel');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

// hash password
exports.hashPassword = async (req, res, next) => {
    console.log(req.body);
    try {
        // const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, 10);
        next();
        console.log('hashing complete')
    } catch (err) {
        res.status(500).send('Error hashing password');
    }
};

// compare password

exports.comparePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ msg: 'Invalid Credentials' });
        } else {
            return res.status(200).send({ msg: 'Login Success' });
        }
        next();
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err,
        });
    }
};

// token check including creation of token and verification of token

exports.tokenCheck = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ msg: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err,
        });
    }
};

// validate email

exports.validateEmail = async (req, res, next) => {
    try {
        if (validator.validate(req.body.email)) {
            next();
        } else {
            res.status(400).send({
                status: 'fail',
                message: 'Please enter a valid email',
            });
        }
    } catch (err) {
        res.status(500).send({error: err.message});
    }
}