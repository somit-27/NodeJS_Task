var app = require("express")();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require("request");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/NJSTask",{useNewUrlParser: true, useUnifiedTopology: true});
var njsschema = new mongoose.Schema({
    name: String,
    DOB: String,
    B_G: String,
    Vac_Stat: String,
    url: String,
});
var njs = mongoose.model("Users",njsschema);

app.get("/",(req,res)=>{
    njs.find({},(err,user)=>{
        if(err){
            console.log(err);
        } else {
            res.render("home",{user: user});
        }
    });
});

app.get("/details/:name",(req,res)=>{
    var nm = req.params.name;
    njs.find({name: nm},(err,user)=>{
        if(err){
            console.log(err);
        } else {
            //console.log(user);
            res.render("info_Users",{user: user});
        }
    });
});

app.post("/adduser",(req,res)=>{
    var name = req.body.name;
    var dob = req.body.DOB;
    var bg = req.body.B_G;
    var vs = req.body.Vac_Stat;
    var url = "/details/" + name;
    var newUser = {name:name, DOB: dob, B_G: bg, Vac_Stat: vs, url: url};
    njs.create(newUser,(err,newlu)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.get("/newuser",(req,res)=>{
    res.render("newuser");
});

app.listen(3000, process.env.IP,function(){
    console.log("NodeJS_Task app has started");
});