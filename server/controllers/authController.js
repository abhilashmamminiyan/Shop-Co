const asyncHandler = require('../middlewares/asyncHandler');
const { User } = require('../models/models');
const { hashPassword, comparePassword } = require('../utils/passwordHelper');
const { createJwt } = require('../utils/jwtHelper');

const register = asyncHandler(async(req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: {email} });
    if(userExists) {
        res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    const token = createJwt(user.id);
    res.status(200).json({
        message: `User created with id: ${user.id}`,
        name: user.name,
        email: user.email,
        token
    });
})

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email} });
    if(!user) {
        res.status(400).json({message:"Invalid Credentials"});
    }
    const isPasswordValid = comparePassword(password, user.password);
    if(!isPasswordValid) {
        res.status(400).json({message:"Invalid Credentials"});
    }
    const token = createJwt(user.id);
    res.status(200).json({
        message: `User logged in with id: ${user.id}`,
        name: user.name,
        email: user.email,
        token
    })
})

module.exports = {
    register, login
}