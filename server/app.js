const express = require('express')
const app = new express()


// Security middleware require
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const xss = require('xss')
const rateLimit = require('express-rate-limit')
const { connectDB } = require('./src/config/database')
const { connectCloudinary } = require('./src/config/cloudinary')
const router = require('./src/routes/api')



// Express Implement
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '50mb'}))

// Security middleware Implement
app.use(helmet())
app.use(hpp())
app.use(cors({
	origin: [
		"http://localhost:5173",
		"http://localhost:3000",
		"https://quick-cart-git-main-mustafijurmohans-projects.vercel.app"
	],
	credentials: true,
	allowedHeaders:["Content-Type", "Authorization", "token"],
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}))

// ✅ Manual MongoDB sanitizer — replaces express-mongo-sanitize
const sanitizeMongoInput = (obj) => {
	if (!obj || typeof obj !== 'object') return
		for (const key in obj) {
			if (key.startsWith('$') || key.includes('.')) {
			delete obj[key]
			} else if (typeof obj[key] === 'object') {
			sanitizeMongoInput(obj[key])
			}
		}
}

app.use((req, res, next) => {
	if (req.body) sanitizeMongoInput(req.body)
	if (req.params) sanitizeMongoInput(req.params)
	next()
})


// Simple middleware to sanitize input
app.use((req, res, next) => {
	if(req.body) {
		for(let key in req.body) {
			if(typeof req.body[key] === 'string') {
				req.body[key] = xss(req.body[key])
			}
		}
	}
	next()
})

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


// Database Connection
connectDB()
// Cloudinary Connection
connectCloudinary()


// Managing Backend API Routing
app.use('/api/v1', router)

module.exports = app