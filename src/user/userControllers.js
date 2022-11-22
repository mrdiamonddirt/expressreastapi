const { response } = require("express");
const User = require("./userModel");

// create new user
exports.createUsers = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

// return all users
exports.getAllUsers = async (req, res) => {
    console.log(req.body);
    try {
        const users = await User.findAll();
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(404).json({
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

// delete user
exports.deleteUser = async (req, res) => {
    console.log(req.params);
    try {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
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
            response.status(200).json({
                status: "success",
                data: {
                    user,
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