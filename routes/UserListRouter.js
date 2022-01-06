const { Router } = require("express")
const app = Router() 
const { UserModel } = require("../schema/UserSchema")

app.get("/", (req, res) => {
    UserModel.find().then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fecthing record." })
    })
})

app.get("/:id", (req, res) => {
    const { params } = req;
    const { id } = params;
    UserModel.find(id).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fetching record." })
    })
})

app.get("/:userName", (req, res) => {
    const { params } = req;
    const { userName } = params;
    UserModel.find({"username":userName}).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error fetching record." })
    })
})

app.post("/", (req, res) => { 
    const {body} = req
    const user = UserModel(body)
    user.save().then((docs)=>{
        res.json(docs)
    }) 
    .catch((error) => {
        res.json({ message: "Error adding record." })
    })
})

app.put("/:id", (req, res) => {
    const { body, params } = req;
    const { id } = params;
    UserModel.findByIdAndUpdate(id, body).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error updating record." })
    })
})

app.delete("/:id", (req, res) => {
    const { params } = req;
    const { id } = params;
    OrderModel.findByIdAndDelete(id).then((docs)=>{
        res.json(docs)
    })
    .catch((error) => {
        res.json({ message: "Error deleting record." })
    })
})

module.exports = app