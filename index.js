const express = require("express")
require("dotenv").config();
const bodyParser = require("body-parser")
const app = express();
const mongoose = require("mongoose")
const {Schema} = mongoose;
const {model} = mongoose;
const port = process.env.Port
const pass = process.env.Password

app.use(bodyParser.urlencoded({extended:true}))
const connectionString = `mongodb+srv://Toshbaba:${pass}tosh.e022gw2.mongodb.net/blogapp?retryWrites=true&w=majority`

// Connect your MongoDB
async function ConnectDB(){
    await mongoose.connect(connectionString)
    console.log("DB connected Successfully")
}
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const userModel = new model("user", userSchema)


app.get("/sign-in", async(req, res)=>{
    const users = await userModel.find();
    res.json(users)
})
app.post("/sign-in", async(req,res)=>{
    const newUser = userModel.create({
        name: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    })
    if(newUser){
        console.log("user Added Successfully")
        res.json({msg: "New user added successfully"})
    }
    else{
        res.json({msg: "error while adding new user"})

    }
});

app.listen(port, ()=>{
    ConnectDB()
    console.log(`This app is running on port ${port}`)
})