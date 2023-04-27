const express = require("express");
require("dotenv").config();
const app = express();
const {connection}=require("./db");
const {userRouter}=require("./routes/user.routes");
const {contactRoutes}=require("./routes/contact.routes");
const {auth}=require("./middleware/auth.middleware");

app.use(express.json());
app.use("/users",userRouter);
app.use(auth);
app.use("/contact",contactRoutes);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to mongo");
    }catch(err){
        console.log(err.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
});