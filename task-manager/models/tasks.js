const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must have a name'],
        maxLength: [20, 'must be less than 20 characters'],
        trim: true
    }, completed: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('task', TaskSchema)