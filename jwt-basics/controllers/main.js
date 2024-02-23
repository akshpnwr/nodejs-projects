const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/index')

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) throw new BadRequestError('Not found')

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Your lucky number is : ${randomNumber}` });
}

module.exports = {
    login,
    dashboard
}