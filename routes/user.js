const {Router} =require("express");
const {userMiddleware}=require("../middleware/user")
const {UserModel,PurchasedModel,CourseModel}=require("../db")
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config")

const userRouter = Router();

userRouter.post("/",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName

    res.json({
        msg:"post endpoint works",
        email,
        firstName,lastName,
        password
    })
})


userRouter.post("/signup",async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;

     await UserModel.create({
          email,
          password,
          firstName,
          lastName
      })

    res.json({
        msg:`${firstName} is signed Up`,
        email,
        password,
    })
})

userRouter.post("/login",async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const firstName=req.body.name

    const foundUser=await UserModel.findOne({
        email,
        password
    })

    console.log("found user= "+foundUser);

    if(foundUser){
        const token=jwt.sign({
            id:foundUser._id.toString()
        },JWT_USER_PASSWORD);

        res.json({
            msg:`${firstName} is logged In`,
            token
        })
    }else{
        res.json({
            msg:"User not available"
        })
    }
})




//user can see all courses-preview endpoint in course.js


//user can see their courses
 userRouter.get("/purchased",userMiddleware,async (req,res)=>{
     const userId=req.userId;

      const purchased=await PurchasedModel.find({userId})

      const purchasedId=[]

      for(i=0;i<purchased.length;i++){
          purchasedId.push(purchased[i].courseId)
      }

// //     //purchasedId=purchased.map(i=>i.courseId)

      const courseData=await CourseModel.find({
          _id:{$in: purchasedId}
      })

     res.json({
         msg:"see purchased courses",
         userId,
         purchased,
         courseData
     })
 })


module.exports={
    userRouter
}