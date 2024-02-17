const express = require('express')
const tasks = require('./routes/tasks')

const app = express()

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
