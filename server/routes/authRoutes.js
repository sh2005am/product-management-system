import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"


const router = express.Router();
router.post("/register", async (req,res) => {
    try {
        const {name, email, password} = req.body
        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(400).json({message: "User already exists"})
        }
        const salt= await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password, salt)
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        await user.save()
        return res.status(201).json({name: user.name,email: user.email})

    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
})
router.post("/login", async (req,res) => {
    try {
        const {email,password} =req.body
        const user = await User.findOne({email})
        if(!user) {
           return res.status(400).json({message: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
            (err, token) => {
                if(err) throw err
                res.json({token})
            }
        )
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})
export default router;
