import express from "express"
import BookModel from "../books/schema.js"
import CartModel from "./schema.js"


const cartsRouter = express.Router()


cartsRoutes.post("/:ownerId/addToCart", async (req, res, next) => {
    try {

        // We are going to receive productId and the corresponding quantity in req.body

        //1)- Find the book into books collection by productId
        const bookId = req.body.productId

        const purchasedBook = await BookModel.findById(bookId)

        if (purchasedBook)
            const isBookThere = await CartModel.findOne({
                ownerId: req.params.ownerId, status: "active",
                "products.asin": purchasedBook.asin
            })
        //2)- Is the product already in the cart?
        if (isBookThere) {
            //3)- If the product is already there ---> increase the previous quantity
            const cart = await CartModel.findOneAndUpdate({
                ownerId: req.params.ownerId,
                satus: "active", "productsa.asin": purchasedBook.asin
            },
                {
                    $inc: { "products.$.quantity": req.body.quantity },
                },
                {
                    new: true
                }
            )
            res.send(cart)
        } else {
            //4)- If the product was not there ---> add it to cart
            const bookToInsert = { ...purchasedBook.toObject(), quantity: req.body.quantity }

            await CartModel.findOneAndUpdate({ ownerId: req.params.ownerId, status: "active" }, {
                $push: { products: boookToInsert }
            },
                {
                    new: true,
                    upsert: true, // if the cart is not found --> just create it automatically
                })
            res.send(cart)
        }

    } catch (error) {

    }
})