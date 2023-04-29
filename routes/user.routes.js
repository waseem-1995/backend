const express=require("express")
const { userModal } = require("../modelauth/model.user")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app=express()

const userRoutes=express.Router()


userRoutes.post("/register",async(req,res)=>{
    const{email,pass,name,age}=req.body
try {
    bcrypt.hash(pass, 5,async (err, hash) =>{
        const user=new userModal({email,age,name,pass:hash})
    await user.save()
    res.status(200).send({"msg":"New user has been registred"})
    })
   
} catch (error) {
    res.status(400).send({"msg":error.message})
    
}


})

userRoutes.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await userModal.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
              if(result){
               const token = jwt.sign({ authorID:user._id,author:user.name }, 'masai')
                res.status(200).send({"msg":"login successfull","token":token})
              }else{
                res.status(200).send({"msg":"wrong credentials"})
              }

            })
           
        }else{
            res.status(200).send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    userRoutes
}
