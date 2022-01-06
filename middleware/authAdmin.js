const jwt = require("jsonwebtoken");
const { APP_SECRET_KEY } = require("../config");
const { UserModel } = require("../schema/UserSchema")

async function AuthAdminMiddleware(req, res, next) {
    try {
        const { headers } = req;
        const { authorization } = headers //get authorization value from postman with generated jwt token aftern login

        //If JWT token is null
        if (!authorization) {
            res.status(401).json({ message: "no auth headers provided." });
            return false;
        }

        //match provided jwt token through authorization along with secret key and get payload
        const payload = jwt.verify(authorization, APP_SECRET_KEY);
        //find by payload id
        const doc = await UserModel.findById(payload.id, "-password")

        //check if user isAdmin 
        if (doc.isAdmin === true) {
            req.user = doc;
            next();
        }
        else {
            res.status(401).json({ message: "not a admin user." });
        }

    } catch (error) {
        res.status(401).json({ message: "auth header not correct." });
    }
}

module.exports = AuthAdminMiddleware;