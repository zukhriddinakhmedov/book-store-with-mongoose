import express from "express"
import createHttpError from "http-errors"
import UserModel from "./schema.js"
import BookModel from "../books/schema.js"

const usersRouter = express.Router()

//to find all users
usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await UserModel.find()

        res.send(users)
    } catch (error) {

    }
})
usersRouter.get("/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
    } catch (error) {

    }
})
usersRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body) //here happens validation of the 
        //req.body, if it is not ok Mongoose will throw a "validationError"
        const { _id } = await newUser.save() //this is where the interraction with the 
        //db/collection happens

        res.status(201).send({ _id })
    } catch (error) {

    }
})
usersRouter.put("/", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const modifiedUser = await UserModel.findByIdAndUpdate(userId, req.body,
            { new: true }) // this returns the modified user
        if (modifiedUser) {
            res.send(modifiedUser)
        } else {
            next(createHttpError(404,))
        }

        res.send(modifiedUser)
    } catch (error) {

    }
})
usersRouter.delete("/", async (req, res, next) => {
    try {

    } catch (error) {

    }
})

usersRouter.post("/:userId/purchaseHistory", async (req, res, next) => {
    try {
        // we are receiving the bookId from req.body. Given the id of that book we 
        //want to insert the corresponding book`s data into the purchase history 
        // (array which belongs to the specified : userId)

        // 1-find the book by id

        const purchasedBook = await BookModel.findById(req.body.bookId)
    } catch (error) {

    }
})

export default usersRouter