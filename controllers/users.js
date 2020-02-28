const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    //This is disabled for security
    return res.status(400);
    /*try {
        const users = await User.find();

        res.status(200).json({ success: true, data: users});
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }*/
};

exports.getUser = async (req, res, next) => {
    //This is disabled for security
    return res.status(400);
    /*try {
        const username = req.params.id;
        const user = await User.findOne({username: username});

        if(!user) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: user});
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }*/
};

exports.createUser = async (req, res, next) => {
    try {

        const { email, username, password } = req.body;
        //hash password - TODO
        const passwordHash = password;
        const user = await User.create({email, username, passwordHash});

        res.status(201).json({
            success: true,
            data: user
        });
    } catch(err) {
        console.log(err);

        //Duplicate key error
        if(err.code === 11000) {
            if(err.keyValue.username) {
                return res.status(400).json({ success: false, error: 'Username not available.'});
            } else if(err.keyValue.email) {
                return res.status(400).json({ success: false, error: 'Email not available.'});
            }
        }

        //Validation error
        if(err.name === 'ValidationError') {
            return res.status(400).json({ success: false, error: Object.values(err.errors).map(val => val.message).join(',')});
        }

        res.status(400).json({ success: false });
    }
};

exports.updateUser = async (req, res, next) => {
    //This is disabled for security
    return res.status(400);
};

exports.deleteUser = (req, res, next) => {
    //This is disabled for security
    return res.status(400);
};