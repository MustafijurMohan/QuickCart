const UserModel = require('../models/UserModel')

// Add to Cart
exports.addCart =async (req, res, next) => {
    try {
        const { itemId, size } = req.body
        const userId = req.user._id // Use authenticated user

        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        
        await UserModel.findByIdAndUpdate(userId, {cartData})

        return res.status(201).json({success: true, message: 'Cart item added successfully.'})
    } catch (err) {
        next(err)
    }
}

// Get to User Cart
exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user._id

        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        return res.status(200).json({success: true, cartData})
    } catch (err) {
        next(err)
        
    }
}

// Update to Cart
exports.updateCart = async (req, res, next) => {
    try {
        const {itemId, size, quantity} = req.body

        const userId = req.user._id

        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await UserModel.findByIdAndUpdate(userId, {cartData})
        return res.status(201).json({success: true})
    } catch (err) {
        next(err)
    }
}