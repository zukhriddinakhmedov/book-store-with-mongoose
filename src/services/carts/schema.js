import mongoose from "mongoose"

const { Schema, model } = mongoose

const cartSchema = new Schema({
    ownderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "paid"], default: "active" },
    products: [{ asin: String, title: String, price: Number, quantity: Number }],
})

export default model("Cart", cartSchema)