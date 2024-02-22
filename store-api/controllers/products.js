const Product = require("../models/product")
const productsData = require('../products.json')

const populateDb = async (req, res) => {
    const products = await Product.insertMany(productsData)
    res.json({ products });
}

const getAllProducts = async (req, res) => {
    const { featured, name, company, sort, fields, limit, page, numericFilters } = req.query
    const queryObject = {}

    if (numericFilters) {

        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq'
        }

        const regEx = /\b(<|>|<=|>=|=)\b/g
        const filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`)

        const options = ['price', 'rating']

        filters.split(',').forEach(filter => {
            const [field, operator, value] = filter.split('-')
            if (options.includes(field))
                queryObject[field] = { [operator]: Number(value) }
        })
    }

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (company) {
        queryObject.company = company
    }

    // sort
    let sortList = 'createdAt';
    if (sort) sortList = sort.split(',').join(' ')

    // filter fields
    let fieldsList = 'name price company rating featured createdAt';
    if (fields) fieldsList = fields.split(',').join(' ')

    const products = await Product
        .find(queryObject)
        .sort(sortList)
        .select(fieldsList)
        .limit(limit ? parseInt(limit) : 10)
        .skip((parseInt(page) - 1) * parseInt(limit))

    res.status(200).json({ nbHits: products.length, products })
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

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    res.status(200).json({ product })
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