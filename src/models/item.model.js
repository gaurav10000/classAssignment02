import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

export const Item = mongoose.model("Item", itemSchema)