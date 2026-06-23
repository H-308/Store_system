
const express = require("express")
const router = express.Router()

const productController = require("../controllers/productsController")

router.get('/', productController.getAllProducts) //get all products
router.get('/:id', productController.getProductById) //get product by id
router.post('/', productController.createProduct) //create new product
router.put('/update/:id', productController.updtaProduct) //update product
router.delete('/:id', productController.deleteProduct) //delete product


module.exports = router