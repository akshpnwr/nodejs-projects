const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({ _id: jobId, createdBy: userId })

    if (!job) throw new NotFoundError(`No job with ID ${jobId}`)

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    const job = await Job.findOneAndDelete({ _id: req.params.id })

    if (!job) throw new NotFoundError(`No job with ID ${req.params.id}`)

    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
    const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    })

    if (!job) throw new NotFoundError(`No job with ID ${req.params.id}`)
    res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}