const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    delete:{
        type:Boolean,
        required:true
    }
})

// now we need to create a collections

const Register = new mongoose.model("Register", employeeSchema);

module.exports=Register;