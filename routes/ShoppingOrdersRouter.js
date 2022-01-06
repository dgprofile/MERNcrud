const { Router } = require("express")
const app = Router() 
const { ShoppingOrderModel } = require("../schema/ShoppingOrderSchema")

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
    const order = ShoppingOrderModel(body)
    
    order.save().then((docs)=>{ 
        res.json(docs)
    }) 
    .catch((error) => {
        res.json({ message: "Error adding record." })
    })
})

module.exports = app