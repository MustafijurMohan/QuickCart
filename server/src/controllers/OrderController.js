require('dotenv').config({quiet: true})
const OrderModel = require('../models/OrderModel')
const UserModel = require('../models/UserModel')


const Stripe = require('stripe')
const currency = 'usd'
const delivery_charge = 10
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeSecretKey)


// Payment Method
// Placing Order using cash on delivary COD Method
exports.placeOrderCash = async (req, res, next) => {
    try {
        const {items, amount, address} = req.body
        const userId = req.user._id

        const orderData = {
            userId, items, amount, address,
            paymentMethod: 'COD',
            payment:false,
            date: Date.now()
        }

        const data = await OrderModel.create(orderData)
        await UserModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(201).json({success: true, data,  message:'Order Placed.'})
    } catch (error) {
        next(error)
    }
}

// Placing Order using stripe Method
exports.placeOrderStripe = async (req, res, next) => {
    try {
        const {items, amount, address} = req.body
        const userId = req.user._id
        const origin = req.headers['origin']

        const orderData = {
            userId, items, amount, address,
            paymentMethod: 'Stripe',
            payment:false,
            date: Date.now()
        }

        const data = await OrderModel.create(orderData)
        
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: delivery_charge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${data._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${data._id}`,
            line_items,
            mode: 'payment'
        })

        res.status(200).json({success: true, session_url: session.url})
    
    } catch (error) {
        next(error)
    }
}


// Verify Stripe
exports.verifyStripe = async (req, res, next) => {
    try {
        const {orderId, success} = req.body
        const userId = req.user._id

        if (success === 'true') {
            await OrderModel.findByIdAndUpdate(orderId, {payment: true})
            await UserModel.findByIdAndUpdate(userId, {cartData: {}})
            res.status(200).json({success: true})
        } else {
            await OrderModel.findByIdAndDelete(orderId)
            res.status(200).json({success: false})
        }
    } catch (error) {
        next(error)
    }
}


// All Order Data for Admin Panel
exports.allOrders = async (req, res ) => {
    try {
        const data = await OrderModel.find()
        res.status(200).json({success: true, data})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}


// Update Order Status from Admin Panel
exports.updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body
        await OrderModel.findByIdAndUpdate(orderId, {status})
        res.status(201).json({success: true, message: ' Status Update Successfull.'})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message})
    }
}


// User Order for frontend
exports.userOrder = async (req, res, next) => {
    try {
        const userId = req.user._id
        const orderData = await OrderModel.find({userId})
        res.status(200).json({success: true, orderData})
    } catch (error) {
        next(error.message)
    }
}



