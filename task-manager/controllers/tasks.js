const asyncWrapper = require('../middleware/async')
const Task = require('../models/tasks')


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(201).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) return res.status(404).json({ msg: `No task with id : ${taskID}` })

    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) return res.status(404).json({ msg: `No task with id : ${taskID}` })

    res.status(200).json({ task, data: req.body })
})

const putTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    })

    if (!task) return res.status(404).json({ msg: `No task with id : ${taskID}` })

    res.status(201).json({ task, data: req.body })

})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) return res.status(404).json({ msg: `No task with id : ${taskID}` })

    res.status(201).json({ task })

})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    putTask
}