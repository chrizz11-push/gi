const express = require("express");
const router = express.Router();
const model = require("./model");
const bcrypt =require("bcrypt");
const { Register, Login } = require("./validateUserFile");
const jwt = require("jsonwebtoken")

router.get("/", async (req,res) => {
    try{
        const getUser = await model.find()
        res.status(200).json({
            message:"successful",
            data: getUser
        })
    }catch (err) {
        res.status(400).json(err.message)
    }
})

router.post("/register", async (req,res) => {
    try{
        // If The Validation Rules Is Not Obeyed This Code Should Run
        const {error} = await Register(req.body)

        if (error) {
            return res.status(401).json(error.details[0].message)
        }

        // Check If Email Has Already Been Use
        const emailChecker = await model.findOne({
            email: req.body.email
        })

        // If The Email Has Already Been Use, This Code Should Run
        if (emailChecker) {
            return res.status(401).json("Email Already Exist")
        }

        // To Encrypt Password
        hider = await bcrypt.genSalt(10);
        passwordHider = await bcrypt.hash(req.body.password, hider)

        // To Create a New User
        const createUser = await model.create({
            userName:req.body.userName,
            email:req.body.email,
            password:passwordHider,
        })

        // If All The "Above Code(Post)" Is Good This Code Should Run
        res.status(201).json({
            message:"successful",
            data: createUser
        })
    } 
    
    // If All The "Above Code(Post)" Have error This Code Should Run 
    catch (err) {
        res.status(400).json(err.message)
    }
})



router.post("/login", async (req,res) => {
    try{
        // If The Validation Rules Is Not Obeyed This Code Should Run
        const {error} = await Login(req.body)

        if (error) {
            return res.status(401).json(error.details[0].message)
        }

        // Check If Email Has Already Been Register
        const emailChecker = await model.findOne({
            email: req.body.email
        })

        // If The Email Has Not Already Been Register, This Code Should Run
        if (!emailChecker) {
            return res.status(401).json("Invalid Email")
        }

        // If The Password Is Registered Together With The Above Email, This Code Should Run
        const passwordChecker = await bcrypt.compare(
            req.body.password,
            emailChecker.password
        )

        // If The Password Is Not Registered With The Email, This Code Should Run  
        if (!passwordChecker) {
            return res.status(401).json("incorrect Password")
        }

        const token = jwt.sign({_id: model._id}, process.env.TOKEN_SECRET);
        res.header("auth-token").send(token);
    }
    
    // If All The "Above Code(Post)" Have error This Code Should Run 
    catch (err) {
        res.status(400).json(err.message)
    }
})

module.exports= router


