const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    name: { type: String, required: true },
    details: { type: String, default: "Selling fast.. hurry up"},
    addedOn: { type: Date, default: new Date() },
    price :  { type: Number, default: 0 },
})

const ProductModel = model("product", ProductSchema, "ShoppingProducts");

module.exports = { ProductModel, ProductSchema };