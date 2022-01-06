const { Router } = require("express")
const app = Router() 
const { ProductModel } = require("../schema/ProductSchema")

app.get("/", (req, res) => {
    ProductModel.find().then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fecthing record." })
    })
})

app.get("/:id", (req, res) => {
    const { params } = req;
    const { id } = params;
    ProductModel.find(id).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fetching record." })
    })
})

app.post("/", (req, res) => { 
    const {body} = req
    const product = ProductModel(body)
    
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
    ProductModel.findByIdAndUpdate(id, body).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error updating record." })
    })
})

app.delete("/:id", (req, res) => {
    const { params } = req;
    const { id } = params;
    ProductModel.findByIdAndDelete(id).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error deleting record." })
    })
})

module.exports = app