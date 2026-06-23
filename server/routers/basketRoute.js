const express = require("express")
const router = express.Router()
const basketContoller = require("../controllers/basketController")
const verify = require("../middleware/verifyJWT")

router.post("/:productId", verify, basketContoller.addProductToBasket)
router.get("/", verify, basketContoller.getBasket)
router.delete("/:productId", verify, basketContoller.deleteProductFromBasket)
router.post("/",verify,basketContoller.changeQuantity)
module.exports = router