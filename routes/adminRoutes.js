const express= require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router =express.Router()
const User=require('../models/userModels')

router.get('/get-all-users',authMiddleware, async (req, res) => {
    try {
        const users=await User.find({isAdmin:false})
        res.status(200).send({
            message:'User fetched successfully',
            success:true,
            data:users
        })
        
    } catch (error) {
        console.log('userlist',error)
        res
        .status(500)
        .send({ message: "Error Occured while displaying  user", success: false, error })
    }
})
router.post('/change-user-status',authMiddleware,async(req,res)=>{
    try {
        // console.log('111111');
        const userIdd=req.body.userIdd
        // console.log(userIdd,'789456123');
        const user=await User.findById({_id:userIdd})
        console.log(user,'741258963');
        if(user.isActive){
            user.isActive=false
        }else{
            user.isActive=true
        }
        await user.save()
        const users=await User.find({isAdmin:false})
        res.status(200).send({
            message:"User-status changed Successfully",
            success:true,
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in Fetching Users",
            success:false,
            error
        })
    }
})

module.exports=router;