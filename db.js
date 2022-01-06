const {connect} = require("mongoose")
const DBurl = "mongodb://localhost:27017"
connect(DBurl).then(()=>{
    console.log("DB is connected")
})