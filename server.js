const express = require("express")
const app = express()
const UserRouter = require("./routes/UserRouter");
const UserListRouter = require("./routes/UserListRouter");
const ProductListRouter = require("./routes/ProductListRouter");
const ShoppingListRouter = require("./routes/ShoppingListRouter");
const ShoppingOrdersRouter = require("./routes/ShoppingOrdersRouter");
const AuthAdminMiddleware = require("./middleware/authAdmin");
const AuthNormalMiddleware = require("./middleware/authNormal");

require("./db")

app.use(express.json())

app.use("/user", UserRouter) //To register and login
app.use("/userList", AuthAdminMiddleware, UserListRouter) //For admin users -> User List - GET/POST/PUT/DELETE
app.use("/productList", AuthAdminMiddleware, ProductListRouter) //For admin users -> Product List - GET/POST/PUT/DELETE
app.use("/shoppingList", AuthAdminMiddleware, ShoppingListRouter) //For admin users -> Orders List - GET/POST/PUT/DELETE
app.use("/shoppingOrder", AuthNormalMiddleware, ShoppingOrdersRouter) //For normal users -> Orders List - GET by loggedin user/ POST by loggedin user

app.listen(3100, ()=>{
    console.log("Listening to 3100")
})