const express = require('express')
const router = express.Router()
const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
const userModel = require('../models/userModels')

router.post('/register', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res 
            .status(200)
            .send({ message: "User Already Exist", success: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10) // to generate the salt , encrypting the password with the help of salt
        const hashedPassword = await bcrypt.hash(password, salt) // hash is used to get the encrypted form of the password
        req.body.password = hashedPassword
        const newuser = new User(req.body)
        await newuser.save()
        res
        .status(200)
        .send({ message: "User created successfully", success: true })
    } catch (error) {
        console.log('register',error)
        res
        .status(500)
        .send({ message: "Error Occured while creating user", success: false, error })
    }
})
router.post('/login', async (req, res) => {
    try {
        const user=await User.findOne({email: req.body.email})
        if(!user){
            return res
            .status(200)
            .send({message: "User Does not Exist",success: false})
        }
        if (!user.isActive) {
            return res
              .status(200)
              .send({ message: "Blocked by Admin", success: false });
          }
        const isMatch=await bcrypt.compare(req.body.password,user.password) // here it is comparing the user.password which is the encrypted password because in db it is encrypted  and req.body.password is normal password
        if(!isMatch){
            return res
            .status(200)
            .send({message: "Incorrect Password",success: false})     
        }else{
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn:"1d"
            }) //the jwt.sign() will generate the token,the expiresIn is for destory the session
            res
            .status(200)
            .send({message:"Login Successfull",success:true,data:token })
        }
    } catch (error) {
        console.log('login',error);
        res
        .status(500)
        .send({ message: "Error in Login", success: false, error })
    }
})
router.post('/get-user-info-by-id',authMiddleware,async(req,res)=>{
    try {
        const user =await User.findOne({_id:req.body.userId})
        user.password=undefined 
        if(!user){
            return res
            .status(200)
            .send({message:"User does not exist",success:false})
        }else{
            res.status(200).send({
                success:true,
                data:user,
                // data:{
                    
                //     name:user.name,
                //     email:user.email,
                //     isAdmin:user.isAdmin,

                // }
        })
        }
    } catch (error) {
        res
        .status(500)
        .send({ message: "Error getting user info", success: false, error })
    }
})

router.post('/update-profile',authMiddleware,async(req,res)=>{
    try {
        console.log(req.body,"gggggggg")
        const updateImage=req.body.imageUpdate
        // console.log(updateImage);
        const user=await User.findOne({_id:req.body.userId})
  
        if(!user){
            return res.status(200).send({message:"User does not exist",success:false})
        }else{
            user.image=updateImage,
            await user.save()
            res.status(200).send({message:"Updated profile successfully",success:true})
        }
  
    } catch (error) {
        res.status(500).send({
            message:"Error getting user-info",success:false,error
        })
    }
  })
  router.post('/update-Details',authMiddleware,async(req,res)=>{
    try {
        const {data,userId} = req.body
        console.log(data,userId,"gggggggg")
          const user = await userModel.findByIdAndUpdate(userId,{$set:{name:data.name,email:data.email}})
          console.log(user);
          if(!user){
            return res.status(200).send({message:"User does not exist",success:false})
        }else{
            await user.save()
            res.status(200).send({message:"Updated profile successfully",success:true})
        }
    } catch (error) {
        res.status(500).send({
            message:"Error getting user-info",success:false,error
        })
    }
  })

module.exports = router