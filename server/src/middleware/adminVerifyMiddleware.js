require('dotenv').config({quiet: true})
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

// exports.adminVerifyMiddleware = async (req, res, next) => {
//     try {
//         const token = req.headers['token']
//         if (!token) {
//             res.status(401).json({success: false, message: 'Unauthorized !!'})
//         }
//         const token_decoded = jwt.verify(token, secretKey )
//         if (token_decoded !== adminEmail+adminPassword) {
//             res.status(401).json({success: false, message: 'Unauthorized !!'})
//         } 
//             next()
        
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({success: false, message: 'Unauthorized.'})
//     }
// }


exports.adminMiddleware = async (req, res, next) => {
    try {
        // console.log(req.user.isAdmin)
        const adminRole = req.user?.isAdmin
        if(!adminRole) {
            return res.status(403).json({message: 'Access denied. User is not an admin.'})
        }
        next()
    } catch (err) {
        next(err)
    }
}

