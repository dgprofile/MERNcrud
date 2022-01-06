const { Schema, model } = require("mongoose");

const ShoppingOrderSchema = new Schema({
    purchasedProductId: { type: String, required: true },
    purchasedByUserId: { type: String, required: true},
    purchasedBy: { type: String, required: true},
    purchasedOn: { type: Date, default: new Date() },
    purchasedQuantity :  { type: Number, default: 1 }
})

const ShoppingOrderModel = model("shoppingOrders", ShoppingOrderSchema, "ShoppingOrdersList");

module.exports = { ShoppingOrderModel, ShoppingOrderSchema };