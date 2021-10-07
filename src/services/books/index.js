import express from "express"
import q2m from "query-to-mongo" // this translates something like category horror&price
// <10&limit
import BookModel from "./schema.js"

const booksRouter = express.Router()

booksRouter.get("/", async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        console.log(mongoQuery)
        const { total, books } = await BookModel.findBookWithAuthors(mongoQuery)
        res.send({ links: mongoQuery.links("/books", total), total, pageTotal: Math.ceil(total / mongoQuery.options.limit), books })
    } catch (error) {
        next(error)
    }
})

booksRouter.post("/", async (req, res, next) => {
    try {
        const newBook = new BookModel(req.body)
        const { _id } = await newBook.save()
        res.send({ _id })
    } catch (error) {
        next(error)
    }
})

export default booksRouter