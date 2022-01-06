const { Router } = require("express")
const app = Router() 
const { ShoppingOrderModel } = require("../schema/ShoppingOrderSchema")

app.get("/", (req, res) => {
    ShoppingOrderModel.find().then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fecthing record." })
    })
})

app.get("/:id", (req, res) => {
    const { params } = req;
    const { id } = params;
    ShoppingOrderModel.find(id).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fetching record." })
    })
})

app.get("/:userId", (req, res) => {
    const { params } = req;
    const { userId } = params;
    ShoppingOrderModel.find({"purchasedByUserId":userId}).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fetching record." })
    })
})

app.post("/", (req, res) => { 
    const {body} = req
    const product = ShoppingOrderModel(body)
    
    product.save().then((docs)=>{ 
        res.json(docs)
    }) 
    .catch((error) => {
        res.json({ message: "Error adding record." })
    })
})

app.put("/:id", (req, res) => {
    const { body, params } = req;
    const { id } = params;
    ShoppingOrderModel.findByIdAndUpdate(id, body).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error updating record." })
    })
})

app.delete("/:id", (req, res) => {
    const { params } = req;
    const { id } = params;
    ShoppingOrderModel.findByIdAndDelete(id).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error deleting record." })
    })
})

module.exports = app