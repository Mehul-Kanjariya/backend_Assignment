const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: String,
    email:{type:String, unique:true},
    phone:Number
},{
    versionKey:false
})

const ContactModel = mongoose.model("contact",contactSchema);

module.exports={
    ContactModel
}