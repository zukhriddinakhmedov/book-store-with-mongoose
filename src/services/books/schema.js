import mongoose from "mongoose"

const { Schema, model } = mongoose


const bookSchema = new Schema({
    asin: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ["horror", "fantasy", "history", "romance"] },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }]
})

bookSchema.static("findBookWithAuthors", async function (mongoQuery) {
    //this can not be an arrow function as it of scope,otherwise it will acccept as global scope
    const total = await this.countDocuments(mongoQuery.criteria)
    const books = await this.find(mongoQuery.criteria, mongoQuery.options.fields)
        .limit(mongoQuery.options.limit || 10)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort) // it does not matter how i write them but Mongo will always accept as SORT then SKIP 
        // then LIMIT in this order

        .populate({ path: "authors", select: "name surname" }) // this is going to join authors with books by searching for all the 
    // references in the authors array (array of objectId)

    return { total, books }
})

export default model("Book", bookSchema)
