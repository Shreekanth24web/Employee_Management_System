const mongoose = require('mongoose')

const EmployeeDataSchema = new mongoose.Schema({
      name:String,
      email:String,
      mobile:String,
      desg:String,
      gen:String,
      courses:[String],
      image: String,
      date:String,
})

const UserModel =mongoose.model("EmployeeData", EmployeeDataSchema)
module.exports=UserModel