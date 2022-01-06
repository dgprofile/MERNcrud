const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: new Date() },
    isAdmin :  { type: Boolean, default: false },
})

const UserModel = model("user", UserSchema, "ShoppingUsers");

module.exports = { UserModel, UserSchema };