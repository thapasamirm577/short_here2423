const express = require("express")
const app = express();

const mongoose = require("mongoose");
const User = require("./model/authModel");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const Link = require("./model/linkModel");
const PORT = process.env.PORT || 5000;

dotenv.config({
    path: "./.env",
});

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true, useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
    console.log("Database conected...");
})

mongoose.connection.on("error",(error)=>{
    console.log("Database not connected... "+error);
})


//middleware for json parse
app.use(express.json());
app.use(cors());

//middleware for login
const userRequiredLogin = (req,res,next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(422).json({ error: "You must be logged in"});
    }
    try {
        const { userId } = jwt.verify(authorization,process.env.JWT_SECRET);
        requestUser = userId;
        next(); 
    } catch (error) {
        console.log("error while accessing usermiddleware "+error);
        res.status(422).json({ message: "User must be loggedin", error: error});
    }
}

//test login middleware
app.get("/test",userRequiredLogin, (req,res)=>{
    res.status(200).json({ message: requestUser});
})

// app.get("/", (req,res)=>{
//     res.json({message: "Hello this is url shorten home"})
// })


//Registering user 
app.post("/register", async(req,res)=>{

    const { name, email, password, cpassword } = req.body;

    try {
        if(!name || !email || !password || !cpassword){
            return res.status(422).json({ error: "Fill all the input field"});
        }
    
        if(password !== cpassword){
            return res.status(422).json({ error: "password must match"});
        }
    
        const user = await User.findOne({ email: email });
        if(user){
            return res.status(422).json({ error: "User already exists"});
        }
    
        const hashedpw = await bycript.hash(password,12);
        const chashedpw = await bycript.hash(cpassword,12);
        
        await new User({
            name: name,
            email: email,
            password: hashedpw,
            cpassword: chashedpw
        }).save();
    
        res.status(200).json({ message: "Succefully registered!"});
    } catch (error) {
        console.log("error in registering: "+error);
        res.status(401).json({ error: error});
    }

});

//login user
app.post("/login", async(req,res)=>{

    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(422).json({ error: "Input must be filled up"});
        }
        const user = await User.findOne({ email: email});
        if(!user){
            return res.status(422).json({ error:"User does not exit"});
        }
        
        const matching = await bycript.compare(password,user.password);
        if(matching){
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
            //console.log(token)
            const data = await User.find({ email: email});
            return res.status(201).json({ message: "Sucessfully signed in", token:token, data: data});
        }else{
            res.status(422).json({ error: "Invalid Credential" });
        }
    } catch (error) {
        console.log("error while login "+ error);
        res.status(422).json({ error: error});
    }
    
});

//getting user
app.get("/displayuser", userRequiredLogin, async(req,res)=>{
    try {
        const data = await User.find({ _id: requestUser});
        //console.log(data);
        return res.status(200).json({ data: data});
    } catch (error) {
        console.log(error)
    }
    
})

//create link
app.post("/create", userRequiredLogin, async(req,res)=>{
    const { originalLink } = req.body;

    if( !originalLink ){
        return res.status(422).json({ error: "Link must be provided"})
    }
    try {

        if(requestUser){
            const data = await new Link({
                originalLink: originalLink,
                createdAt: new Date(),  
                linkBy: requestUser
            }).save();
            return res.status(200).json({ message:"Successfully created", data: data});
        }else{
            const data = await new Link({
                originalLink: originalLink,
                createdAt: new Date()
            }).save();
            return res.status(200).json({ message:"Successfully created", data: data});
        }
        

    } catch (error) {
        console.log(error);
        res.status(422).json({ error: "link creation problem "+error});
    }

})

//create link no auth
app.post("/create-no-auth", async(req,res)=>{
    const { originalLink } = req.body;

    if( !originalLink ){
        return res.status(422).json({ error: "Link must be provided"})
    }
    try {
        const data = await new Link({
            originalLink: originalLink,
            createdAt: new Date()
        }).save();
        return res.status(200).json({ message:"Successfully created", data: data});
        
    } catch (error) {
        console.log(error);
        res.status(422).json({ error: "link creation problem "+error});
    }

})

//display all link
app.get("/display", userRequiredLogin, async(req,res)=>{
    try {
        const data = await Link.find({ linkBy: requestUser});
        if(!data){
            res.status(200).json({ message: "You don't have any short link"})
        }
        res.status(200).json({ message:"Links find successfully", data: data});

    } catch (error) {
        console.log(error)
        res.status(422).json({ error: error });
       
    }
})

//delete link
app.delete("/delete/:id", userRequiredLogin, async(req,res)=>{
    
    if(!req.params.id){
        return res.status(422).json({ error: "Please delete properly"})
    }   

    try {
        const data = await Link.findOne({ _id: req.params.id });
        if(!data){
            return res.status(422).json({ error: "Link not found"});
        }
        const deleteData = await Link.findByIdAndRemove({ _id: req.params.id});
        return res.status(200).json({ message:"Successfully deleted ", data: deleteData});

    } catch (error) {
        res.status(422).json({ error: error});
    }
})

// get shorturl and redirect
app.get('/:shortUrl', async(req,res)=>{
    const shortUrl = await Link.findOne({ shortLink: req.params.shortUrl});
    if(!shortUrl){
        return res.sendStatus(404);
    }
    res.redirect(shortUrl.originalLink);
})


if(process.env.PORT === 'production'){
    app.use(express.static("frontend/build"));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}


//application listening
app.listen(PORT,()=>{
    console.log("App is running on port "+PORT);
})