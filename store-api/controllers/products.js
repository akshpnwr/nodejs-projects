const Product = require("../models/product")
const productsData = require('../products.json')

const populateDb = async (req, res) => {
    const products = await Product.insertMany(productsData)
    res.json({ products });
}

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ products })
}

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) res.status(404).send(`No product with id: ${req.params.id}`)

    res.status(200).json({ product })
}

const createProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json({ product })
}

const updateProduct = (req, res) => {
    res.send('update product')
}

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) res.status(404).send(`No product with id: ${req.params.id}`)

    res.status(200).json({ product })
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    populateDb
}