const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,  // this means that the value of this field must be unique in the
        required:true
    }, 
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    cpassword:{
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String, // Assuming role is a string, modify it according to your needs
        required: true
    },
    tokens: [{
        token: {
                  type: String,
                  required: true
        }
    }],
})


const userdb=mongoose.model("users", userSchema);
module.exports=userdb;