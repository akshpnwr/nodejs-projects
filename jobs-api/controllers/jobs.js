const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    res.status(StatusCodes.OK).json(req.user)
}

const getJob = async (req, res) => {
    res.send('get job')
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}

const updateJob = async (req, res) => {
    res.send('update job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}