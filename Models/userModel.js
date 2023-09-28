const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true
    },
    inbox:{
        type:Array,
        default: []
    },
    starred:{
        type:Array,
        default: []
    },
    drafts:{
        type:Array,
        default: []
    },
    trash:{
        type:Array,
        default: []
    },
    sent:{
        type:Array,
        default: []
    },
    important:{
        type:Array,
        default: []
    },
},{timeStamps:true})


const User = mongoose.model('user', userSchema)
module.exports = User