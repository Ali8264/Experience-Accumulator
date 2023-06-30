const dotenv = require("dotenv");
const express  = require("express");
const mongoose = require("mongoose");
const cors =require("cors");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000","http://map-pinning-app.onrender.com"]
}));

mongoose.connect(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("mongodb connected");
}).catch((err)=>{
    console.log("mongodb not connected")
});
app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);

app.listen(process.env.PORT,()=>{
    console.log("backend server is running!!")
})