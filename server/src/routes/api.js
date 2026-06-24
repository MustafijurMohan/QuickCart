const express = require('express')
const { registerUser, loginUser, adminLogin } = require('../controllers/UserController')
const { authVerifyMiddleware } = require('../middleware/authVerifyMiddleware')
const { adminMiddleware } = require('../middleware/adminVerifyMiddleware')
const { addProducts, listProducts, singleProducts, removeProducts } = require('../controllers/ProductController')
const uploadMiddleware = require('../middleware/multer')
const { addCart, updateCart, getCart } = require('../controllers/CartController')
const { placeOrderCash, allOrders, updateStatus, userOrder, placeOrderStripe, verifyStripe } = require('../controllers/OrderController')
const router = new express.Router()


// User api
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user-order', authVerifyMiddleware, userOrder)


// router.post('/admin', authVerifyMiddleware, adminMiddleware)
router.get('/auth', authVerifyMiddleware)
router.get('/admin',authVerifyMiddleware, adminMiddleware)

// Admin api
// router.post('/admin-login', adminLogin)
router.post('/add-products', authVerifyMiddleware, adminMiddleware, uploadMiddleware, addProducts)
router.delete('/remove-products/:id', authVerifyMiddleware, adminMiddleware, removeProducts)
// order data
router.delete('/remove-products/:id', authVerifyMiddleware, adminMiddleware, removeProducts)
router.get('/orders-list', authVerifyMiddleware, adminMiddleware, allOrders)
router.post('/update-status', authVerifyMiddleware, adminMiddleware, updateStatus)


// Product api
router.get('/list-products', listProducts)
router.get('/single-products/:id', singleProducts)


// Cart api
router.post('/add-cart', authVerifyMiddleware, addCart)
router.get('/get-cart', authVerifyMiddleware, getCart)
router.post('/update-cart', authVerifyMiddleware, updateCart)




// Order api
router.post('/cash', authVerifyMiddleware, placeOrderCash)
router.post('/stripe', authVerifyMiddleware, placeOrderStripe)
router.post('/verifyStripe', authVerifyMiddleware, verifyStripe)

module.exports = router


