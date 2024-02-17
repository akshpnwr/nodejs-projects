const express = require('express')
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    } catch (error) {
        console.log(error)
    }
}

start()