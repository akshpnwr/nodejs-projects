const express = require('express')
const productsRouter = require('./routes/products')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const app = express()
require('dotenv').config()
require('express-async-errors')

// middleware
app.use(express.json())

// routes
app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('Server is running on port 3000'))
    } catch (error) {
        console.log(error);
    }
}


start()
