import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://ammar:ammar@cluster0.vuzjvhx.mongodb.net/CapstoneDB");
const app = express();
app.use(express.static("public"));
const port = 3000;

const blogDataSchema = mongoose.Schema({
    title: String,
    Paragraph: String
})
const blogData = mongoose.model("BlogInfo",blogDataSchema);
app.use(bodyParser.urlencoded({extended:true}));

var array = [];
blogData.find()
    .then(function(stuff){
        for(let i =0;i<stuff.length;i++){
            array.push(stuff[i].title);
            array.push(stuff[i].Paragraph);
            console.log(stuff[i].title);
        }
    })
    .catch(err=>{
        console.log(err);
    })

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        Array: array,
    });
})
app.get("/compose",(req,res)=>{
    res.render("compose.ejs");
})
app.get("/about.ejs",(req,res)=>{
    res.render("about.ejs");
})
app.get("/contact.ejs",(req,res)=>{
    res.render("contact.ejs");
})
app.get("/readmore.ejs/:data",(req,res)=>{
    res.render("readmore.ejs",{
        Values: req.params.data,
        Array: array
    })
})
app.post("/post", (req,res)=>{
    array.push(req.body.title);
    array.push(req.body.content);
    const blogItem = new blogData({
        title: req.body.title,
        Paragraph: req.body.content
    })
    blogData.insertMany(blogItem)
        .then( result =>{
            console.log(result);
        })
        .catch(err =>{
            console.log(err);
        })
    res.render("index.ejs",{
        Array: array,
        Value: req.body.title
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})