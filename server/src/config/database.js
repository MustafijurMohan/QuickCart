require('dotenv').config({quiet: true})

const URL = process.env.MONGO_URI
const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log(`Database Connection Successfull.`)
    } catch (error) {
        console.log(error.message)
    }
}

