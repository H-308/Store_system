
const Product = require("../models/productsModel")

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    res.json(products)
}

const getProductById = async (req, res) => {
    const { id } = req.params
    const data = req.params
    console.log(data);
    const product = await Product.findById(id).lean()
    if (!product) {
        return res.status(400).send('There is no products with that id, Sorry...')
    }
    res.json(product)
}

const createProduct = async (req, res) => {
    const { name, price, descreption, available,image } = req.body
    if (!name || !price) {
        return res.status(400).send("name and price are requiere!! please enter them!!")
    }
    const product = await Product.findOne({ name: name }).lean()
    console.log(product);
    if (product) {
        return res.status(400).send("There is a product with that name already, please check everything is ok!")
    }
    const newProduct = await Product.create({ name, price, descreption, available,image })
    res.json(`product created succesfully`)
}

const updtaProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return res.status(400).send('There is no products with that id, Sorry...')
    }
    const { name, price, descreption, available,image } = req.body
    product.name = name 
    product.price = price
    product.descreption = descreption
    product.available = available
    product.image=image
    await product.save()
    res.send(`product with id ${product._id} updated succesfully`)
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return res.status(400).send('There is no products with that id, Sorry...')
    }
    await product.deleteOne()
    res.send(`product with id ${product._id} deldeted succesfully`)
}


module.exports = { getAllProducts, getProductById, createProduct, updtaProduct, deleteProduct }