const mongoose=require("mongoose")

const emp=mongoose.Schema({

    EmployeeId:Number,
    Name:String,
    DOB:Date,
    Department:String,
    Location:String
})

const Employee=mongoose.model("emp",emp)
module.exports=Employee;    