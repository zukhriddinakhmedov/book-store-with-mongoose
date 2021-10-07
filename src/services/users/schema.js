import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, min: 18, max: 65, required: true },
    dateOfBirth: { type: Date },
    professions: [String],
}, {
    timestamps: true // adds createdAt and updatedAt automatically
})

export default model("User", userSchema) // bounded to the "users" collection,
//if the collection is not there it is automatically created
