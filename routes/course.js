const {Router}=require("express");
const courseRouter=Router();
const jwt=require("jsonwebtoken");
const {userMiddleware} =require("../middleware/user")
const {PurchasedModel,CourseModel}=require("../db")

 courseRouter.post("/purchase",userMiddleware,async(req,res)=>{
     const userId=req.userId;
     const courseId=req.body.courseId;

    await PurchasedModel.create({
          userId,
          courseId
    })

     res.json({
         msg:"course has been purchased",
        userId 
     })

 })

courseRouter.get("/preview",async (req,res)=>{
    const courses=await CourseModel.find({})

    res.json({
        msg:"these are all the courses",
        courses

    });
})

module.exports={
    courseRouter
}
