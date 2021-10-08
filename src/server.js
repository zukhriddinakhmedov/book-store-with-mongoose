import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import usersRouter from "./services/users/index.js"
import booksRouter from "./services/books/index.js"
import authorsRouter from "./services/authors/index.js"
import cartsRouter from "./services/carts/index.js"


const server = express()

const port = process.env.PORT || 3001

//------------------------MIDDLEWARES-------------------

server.use(cors())
server.use(express.json())

//--------------------------ROUTES----------------------

server.use("/users", usersRouter)
server.use("/books", booksRouter)
server.use("/authors", authorsRouter)
server.use("/carts", cartsRouter)

//---------------ERROR HANDLERS-----------------

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to Mongo!")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log(`Server running on port ${port}`)
    })
})

mongoose.connection.on("error", err => {
    console.log(err)
})