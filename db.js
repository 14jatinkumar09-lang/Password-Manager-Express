const mongoose = require("mongoose") ;

const todoSchema = new mongoose.Schema({
    userName : {
        type : String , 
        unique : true ,
        required  : true
    } ,
    password : {
        type : String , 
        required  : true
    } , 
    files : [{
        name : { type : String , required : true },

        password : {
            iv :      { type : String , required : true },
            content : { type : String , required : true },
            tag :     { type : String , required : true }
        }
    }] ,
        
} , {timestamps : true   })


module.exports = todoSchema ;