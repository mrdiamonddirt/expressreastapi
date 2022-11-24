const { response } = require("express");
const { Sequelize } = require ('sequelize');
const JWT = require('jsonwebtoken');
const User = require("./userModel");
// check if table users exists if not create it
User.sync({ force: false })
    .then(() => {
        console.log("table created");
    })


// create new user
exports.createUsers = async (req, res) => {
    let statuscode = 201;
    let body;
    try {
        const newUser = await User.create(req.body);
        const token = await JWT.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(201).send({
                user: newUser,
                token: token
        });
    } catch (err) {
        console.log(err.message)
        // response.status(500).send({
        //     status: "fail",
        //     message: err.message
        // });
    }
};

// return all users
exports.getAllUsers = async (req, res) => {
    console.log(req.body);
    try {
        const users = await User.findAll();
        res.status(200).send({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(404).send({
            status: "fail",
            message: err,
        });
    }
}

// get one user
exports.getUser = async (req, res) => {
    console.log(req.params);
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
}

// update user
exports.updateUser = async (req, res) => {
    console.log(req.params);
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(404).send({
            status: "fail",
            message: err,
        });
    }
}


// delete user
exports.deleteUser = async (req, res) => {
    console.log(req.params);
    try {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send({
            status: "success",
            data: {
                user: 'user deleted',
            },
        });
    } catch (err) {
        res.status(404).send({
            status: "fail",
            message: err,
        });
    }
}



// login user
exports.loginUser = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.email && req.body.password) {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });
            const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET,)
            response.status(200).send({
                status: "success",
                data: {
                    user, token
                }, 
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "Please enter email and password",
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
        
    }
}