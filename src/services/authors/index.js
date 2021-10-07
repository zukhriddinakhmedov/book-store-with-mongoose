import express from "express"
import q2m from "query-to-mongo" // translates something like category=horror&price<10&limit=5&sort=price&offSet=10&fields=title

import AuthorModel from "./schema.js"

const authorsRouter = express.Router()

authorsRouter.get("/", async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        const total = await AuthorModel.countDocuments(mongoQuery.criteria)
        const authors = await AuthorModel.find(mongoQuery.criteria, mongoQuery.options.fields)
            .limit(mongoQuery.options.limit || 10)
            .skip(mongoQuery.options.skip)
            .sort(mongoQuery.options.sort) // no matter how i write them but Mongo will always appply SORT then SKIP then LIMIT
        // in this order 
        res.send({ links: mongoQuery.links("/authors", total), total, pageTotal: Math.ceil(total / mongoQuery.options.limit), authors })
    } catch (error) {
        next(error)
    }
})

authorsRouter.post("/", async (req, res, next) => {
    try {
        const newAuthor = new AuthorModel(req.body)
        const { _id } = await newAuthor.save()
        res.send({ _id })
    } catch (error) {
        next(error)
    }
})

export default authorsRouter
