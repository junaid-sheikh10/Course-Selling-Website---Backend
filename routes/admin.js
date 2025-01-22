const {Router}=require("express");
const {adminMiddleware}=require("../middleware/admin")
const {AdminModel, CourseModel} =require("../db");
const jwt=require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../config")

const adminRouter=Router();


adminRouter.post("/signup",async (req,res)=>{
   const {email,password,firstName,lastName}=req.body

     const admin=await AdminModel.findOne({
         email
     })

    if(admin){
         res.json({msg:"Admin already exists"})
     }else{
         await AdminModel.create({
             email,
             password,
             firstName,
             lastName
         })

         res.json({
             msg:`${firstName} is signed Up`
         })
     }

     //await AdminModel.create({
     //    email,
     //    password,
     //    firstName,
     //    lastName
     //})

    res.json({
        msg:`${firstName} is signed up`
    })

})


adminRouter.post("/login",async(req,res)=>{
    const {name,email,password}=req.body;

    const admin=await AdminModel.findOne({
        email
    })

     if(admin){
         const token=jwt.sign({id:admin._id.toString()},JWT_ADMIN_PASSWORD)

         token?res.json({token,msg:name+" is logged in as Admin"}) : res.json({msg:"token invalid"}) 

     }else{
         res.json({
             msg:"Incorrect email/password"
         })
     }

    // res.json({
    //     admin
    // })

})



adminRouter.post("/course",adminMiddleware,async(req,res)=>{
     const adminId=req.userId
     const {title,description,imageUrl,price,creatorName}=req.body;    
      const course=await CourseModel.create({
          title,description,imageUrl,price,creatorId:adminId,creatorName
      })

     res.json({
         msg:"course created",
         courseId:course._id
        //adminId
     })
})

adminRouter.put("/course",adminMiddleware,async (req,res)=>{
         const adminId=req.userI
         const {title,description,imageUrl,price,courseId}=req.body;
     
         const course=await CourseModel.updateOne({
             _id:courseId,
             creatorId:adminId
    
     },{
             title,description,imageUrl,price
     })
         res.json({
             msg:"course updated",
             courseId:course._id})
})
    





 adminRouter.get("/course/bulk",adminMiddleware,async (req,res)=>{
     const adminId=req.userId
     const courses=await CourseModel.find({
         creatorId:adminId
    })
    res.json({
         courses
    })
 })

module.exports={
    adminRouter:adminRouter
}