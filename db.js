const mongoose=require("mongoose")

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const User=new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
})

const Admin=new Schema({
    
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
})

//Schema for Courses

const Courses=new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
    creatorName:String
})

//Schema for Purchased
const Purchased=new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const UserModel=mongoose.model('users',User);
const AdminModel=mongoose.model('admin',Admin);
const CourseModel=mongoose.model("courses",Courses);
const PurchasedModel=mongoose.model("purchased",Purchased)

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchasedModel
}