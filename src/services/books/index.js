import express from "express"
import q2m from "query-to-mongo" // this translates something like category horror&price
// <10&limit
import BookModel from "./schema.js"

const booksRouter = express.Router()

booksRouter.get("/", async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        console.log(mongoQuery)
        const books = await BookModel.find(mongoQuery.criteria, mongoQuery.options.fields)
            .limit(mongoQuery.options.limit)
            .skip(mongoQuery.options.skip)
            .sort(mongoQuery.options.sort) //no matter how i write them 
            //but Mongo will always apply SORT then
            // SKIP then LIMIT in this order
            .populate()
        res.send(books)
    } catch (error) {
        next(error)
    }
})

