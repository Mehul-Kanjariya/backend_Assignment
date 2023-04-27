const express = require("express");
const contactRoutes = express.Router();
const {ContactModel} = require("../model/contact.model");
const jwt = require("jsonwebtoken");

contactRoutes.get("/", async(req,res)=>{
    let {name} = req.query;
    let {email} = req.query;

    let a;
    if(name){
        a={name}
    }else if(email){
        a={email}
    }

    let {page} = req.query;
    page=page*10;
    // console.log(a)
    if(a){
        try{
            const contact = await ContactModel.find(a).skip(page).limit(10);
            res.status(200).send(contact);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }else{
        try{
            const contact = await ContactModel.find().skip(page).limit(10);
            res.status(200).send(contact);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }
})

contactRoutes.post("/add", async(req,res)=>{
    try{
        const contact = new ContactModel(req.body);
        await contact.save();
        res.status(200).send({"message":"A contact has been added"});
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

contactRoutes.patch("/edit/:id", async(req,res)=>{
    const {id}=req.params;
    const payload=req.body

    try{
        const contact = await ContactModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"message":`Contact with id ${id} has been updated`});
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

contactRoutes.delete("/delete/:id", async(req,res)=>{
    const {id}=req.params;
    try{
        const contact = await ContactModel.findByIdAndDelete({_id:id});
        res.status(200).send({"message":`Contact with id ${id} has been deleted`});
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

module.exports={
    contactRoutes
}