require('dotenv').config({quiet: true})
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY
const UserModel = require('../models/UserModel')

exports.authVerifyMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            res.status(401).json({success: false, message: 'Unauthorized !!'})
        } else {
            const token_decoded = jwt.verify(token, secretKey)
            // req.body.userId = token_decoded.userId
            // console.log(token_decoded)
            const userData = await UserModel.findOne({_id: token_decoded.userId}).select({password: 0})
            

            req.user = userData
            req.token = token,
            next()
            // console.log(req.user = userData)
            
        }
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
}




