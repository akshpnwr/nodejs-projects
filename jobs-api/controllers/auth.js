const { CustomAPIError } = require("../errors");
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { name, password } = req.body
    const { password: hashedPassword } = await User.findOne({ name })

    const match = await bcrypt.compare(password, hashedPassword)

    if (!match) throw new CustomAPIError('Invalid credentials')

    res.status(200).json({ msg: 'logged in' })

}

module.exports = { register, login }