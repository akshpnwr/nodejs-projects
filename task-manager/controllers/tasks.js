const Task = require('../models/tasks')

const getAllTasks = (req, res) => {
    Task.find({}, (err, tasks) => {
        res.status(201).json(tasks)
    })
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

const getTask = (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        console.log(task);
        res.json({ task });
    })
}

const updateTask = (req, res) => {
    Task.updateOne({ id: req.params.id }, { completed: req.params.completed }, (err, r) => {
        res.json(r)
    })
}

const deleteTask = (req, res) => {
    Task.remove({ id: req.params.id }, (err, re) => {
        res.json(re)
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}