require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const port =process.env.PORT || 2001
const url = "mongodb://localhost/formValidation"
const app = express()
const path = require("./Router")
const landing = require("./LandingPage")
const cors = require("cors")

app.use(express.json())
app.use(cors())


mongoose.connect(url, {
    useNewUrlParser:true,
}).then(() => {
    console.log("server is good")
})
.catch(() => {
    console.log("an error occured")
})

app.use("/crud", path )
app.get("/", (req,res) => {
    res.send("crud method is ready")
})
app.use("/home", landing)

app.listen(port, () => {
    console.log(`server is listening to: ${port}`)
})

