const { CustomAPIError } = require("../errors");
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword })

    const token = await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
    const { name, password } = req.body
    const { password: hashedPassword } = await User.findOne({ name })

    const match = await bcrypt.compare(password, hashedPassword)

    if (!match) throw new CustomAPIError('Invalid credentials')

    res.status(200).json({ msg: 'logged in' })

}

module.exports = { register, login }