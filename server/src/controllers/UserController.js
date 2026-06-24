require('dotenv').config({quiet: true})
const UserModel = require('../models/UserModel')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secretKey = process.env.JWT_SECRET_KEY
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

// Register User
exports.registerUser = async(req, res, next) => {
    try {
        const {name, email, password} = req.body

        // 1. Basic validation checks
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "Name, email, and password are required.",});
        }

        
        // 2. Email format check (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email format.",});
        }

        // 3. Password length check
        if(password.length < 8 ) {
            return res.status(400).json({success: false, message: 'Please enter a 8 digit strong password !!'})
        }

        // 4. Check if user already exists
        const userExits = await UserModel.findOne({email})

        if(userExits) {
            return res.status(400).json({success: false, message: 'User already exists with this email.'})
        }

        
        // 5.Password hash and salt
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password, saltRound)

        // 6. Crate Data in database
        const data = await UserModel.create({name, email, password: hash_password})

        // 7. Genrate Token 
        const token = jwt.sign({
            userId: data._id,
            email: data.email,
            isAdmin: data.isAdmin
        }, secretKey, {expiresIn: '1d'})

        return res.status(201).json({success: true, message: "User registered successfully.", data: data, token})

    } catch (err) {
        next(err)
    }
}


// Login User
exports.loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body

        // 1. Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({success: false, message: "Email and Password are required.",});
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email format.",});
        }

         // 3. Check if user exists
        const user = await UserModel.findOne({email})
        if(!user) {
            return res.status(400).json({success: false, message: "User does not exits !!"})
        }
        
        // 4. Check password match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({success: false, message: 'Invalid Credentials.'})
        }

        // 5. Generate Token
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        }, secretKey, {expiresIn: '1d'})

        return res.status(201).json({success: true, message: 'User Login Successfull',  data: {userId: user._id, email: user.email, isAdmin: user.isAdmin}, token})
        
        
    } catch (err) {
        next(err)
    }
}

// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email+password, secretKey)
            res.status(201).json({success: true, token, message: 'Admin Login Successfull.'})
        } else {
            res.status(400).json({success: false, message: 'Invalid Credentials.'})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}

