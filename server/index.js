
require('dotenv').config({ quiet: true })
const app = require('./app')
const port = process.env.PORT || 4000



// Home Page Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello Everyone! This is MERN Stack Ecommerce Project.')
})

// Undifine Routes
app.use((req, res, next) => {
    const error = new Error(' 404 !!! Page not found.')
    error.status = 404
    next(error)
})

// Global Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)

    if(res.headersSent) {
        return next(err)
    }
    return res.status(500).json({success: false, message: err.message || "Internal Server Error"})
})

// Server Running
app.listen(port, () => {
    console.log(`Server running Successfull at port :${port}`)
})


