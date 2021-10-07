import mongoose from "mongoose"

const { Schema, model } = mongoose


const bookSchema = new Schema({
    asin: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }]
})