const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new CustomAPIError('Please provide username and password', 400)
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, John`, secret: `Your lucky number is : ${randomNumber}` });
}

module.exports = {
    login,
    dashboard
}