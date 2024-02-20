// import mongoose
const mongoose = require('mongoose')

// create scheme
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'Must Be atleast 3 Characters but get {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        // if the input is not aproper email id the it throw the error and return invaild email

        // isEmail is a method in validtor which check whether the input is a proper email id or not
        validator(value){
            if(validator.isEmail(value))
            {throw new Error('Invalid Email')}
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String,
    },
    profile:{
        type:String,
    }
})



// create model
const users = mongoose.model("users",userSchema)

// export
module.exports = users