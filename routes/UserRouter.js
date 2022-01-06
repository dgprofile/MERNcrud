const { Router } = require("express")
const app = Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { APP_SECRET_KEY } = require("../config")
const { UserModel } = require("../schema/UserSchema")

app.post("/register", async(req, res)=>{
    const { body } = req;
    const {userName, passWord} = body
    if (userName && passWord && userName !== "" && passWord !== "") {

        //create bcrypt the registering passWord
        const encryptedPassword = await bcrypt.hash(passWord, 10)
        // create new user
        const newUser = new UserModel({
            username: userName,
            password: encryptedPassword
        })
        const doc = await newUser.save()
        res.json({ message: "New User Created." });
    }
    else {
        res.status(400).json()
    }
})

app.post("/login", async(req, res)=>{
    try{
        const {body} = req;
        const {userName, passWord} = body

        if (userName && passWord && userName !== "" && passWord !== "") {

            //check if user with provided userName is present
            const doc = await UserModel.findOne({ username: userName })
            console.log(doc);
            if(!doc)
            {
                res.status(401).json({ message: "you are not authorized" })
            }

            //verify provided passWord with bcrypted password of the entered userName matches
            const verify = await bcrypt.compare(passWord, doc.password)
            if (verify) {

                //generate token
                const token = jwt.sign({ id : doc._id }, APP_SECRET_KEY, { expiresIn : 3600 })
                res.json({ message: "user logged in", token : token })
            }
            else {
                res.status(401).json({ message: "you are not authorized" });
            }
        }
        else{
            res.status(400).json({ message: "worng credentials entered" })
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = app