const Basket = require("../models/basketModel")

const addProductToBasket = async (req, res) => {
    const { productId } = req.params
    const userId = req.user._id
    const arrProductsInBasket = await Basket.findOne({ userId: userId }, { products: 0 })
    console.log(JSON.stringify( arrProductsInBasket));

    if (!arrProductsInBasket) {
        //תיצור מודל חדש
        await Basket.create({ userId: req.user._id, productsList: [{ productId, quantity: 1 }] })
        return res.send("product added/created succesfully")
    }
    let flag = false
    arrProductsInBasket.productsList.map((product) => {
        if (product.productId==productId) {
            product.quantity += 1
            flag = true
        }
    })

    if (!flag) {
        arrProductsInBasket.productsList.push({ productId: productId })
    }
    await arrProductsInBasket.save()
    res.send("product added succesfully")
}

// פונקציה שמביאה לכל לקוח את הסל שלו
const getBasket = async (req, res) => {
    const userId = req.user._id
    const arrProductsInBasket = await Basket.findOne({ userId: userId }).populate('productsList.productId')
    if (!arrProductsInBasket)
        return res.json([])
    return res.json(arrProductsInBasket)
}

//פונקציה שמוחקת מוצר מהסל
const deleteProductFromBasket = async (req, res) => {
    const { productId } = req.params
    const userId = req.user._id
    const basket = await Basket.findOne({ userId: userId }, { products: 0 })
    if (!basket)
        return res.status(400).json({ message: 'There is no basket, Sorry...' })
    const updateBasket = basket.productsList.filter((product) => {
        return product._id != productId
    })
    basket.productsList = updateBasket
    await basket.save()
    res.json({ message: "product delete from basket successfully" });

}

const changeQuantity = async(req, res)=>{
    const obj= req.body
    const userId = req.user._id
    const basket = await Basket.findOne({ userId: userId }, { products: 0 })
    const updateBasket= basket.productsList.filter((pro)=>{
        if(pro.productId._id == obj.proId._id)
            pro.quantity+=obj.num
        return pro.quantity>0
    })
    basket.productsList=updateBasket
    await basket.save()
    res.json({ message: "The quantity updated" });
}

module.exports = { addProductToBasket, getBasket, deleteProductFromBasket ,changeQuantity}