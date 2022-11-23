const bcrypt = require('bcryptjs');
const User = require('../user/userModel');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

// hash password
exports.hashPassword = async (req, res, next) => {
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        
        console.log('hashing complete')
    } catch (err) {
        res.status(500).send('Error hashing password');
    }
    next();
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
        
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err,
        });
    }
    next();
};

// token check including creation of token and verification of token

exports.tokenCheck = async (req, res, next) => {
    console.log(req);
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            req.user = user;
            console.log('Token Verified')
            console.log(user)
        }
    } catch (err) {
        res.status(500).send({
            status: 'fail',
            message: err,
        });
    }
    next();
};

// validate email

exports.validateEmail = async (req, res, next) => {
    try {
        if (validator.validate(req.body.email)) {
            console.log('email is valid');
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
    next();
}