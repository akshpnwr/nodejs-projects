const express = require('express')
require('express-async-errors')

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct, populateDb } = require('../controllers/products')

const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
router.post('/populate', populateDb)
module.exports = router