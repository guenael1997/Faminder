const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()

//model

const User = require("./Model/Schema/User")
const Spaces = require("./Model/Schema/Space")
const ResetToken = require("./Model/Schema/ResetToken")
const Event = require('./Model/Schema/Event')

//init app
const app = express()
app.use(session({
    secret:'my secret',
    saveUninitialized: true,
    resave:false,
    cookie: { secure: true }
}))

//init cors
app.use(cors())


//init formidable
const form = formidable({uploadDir:__dirname+'/Uploads',keepExtensions:true});

//connect to database
mongoose.connect(process.env.DATABASE_LINK);

//init passport local mongoose

//init body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Passport-local-mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//API route - User
app.route("/api/users")
.get((req,res)=>{
    User.find((err,obj)=>{
        res.send(obj);
    })
})
.post((req,res)=>{
    User.register(
        {
            username:req.body.username,
            active:true,
            image:"",
            email:req.body.email,
            color:"red"
        },
        req.body.password,
        (err,obj)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send(obj)
            }
        }
    )
})

app.route("/api/user/:ID")
.get((req,res)=>{
    User.find({_id:req.params.ID},(err,obj)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(obj)
        }
    })
})
.patch((req,res)=>{
    var Image
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.send(err)
        }
        else{
            const Object = {
                username:fields.username,
                oldPassword:fields.oldPassword,
                newPassword:fields.newPassword,
                email:fields.email,
                color:fields.color
            }
            console.log(Object)
            if(files.ImageFile.size!=0){
                Image = "http://localhost:8000/Uploads/"+files.ImageFile.newFilename
            }

            if(req.body.newPassword =! null){
                User.findOne({_id:req.params.ID},(err,obj)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        obj.changePassword(Object.oldPassword,Object.newPassword,(err)=>{
                            if(err){
                                console.log(err)
                            }
                        })
                    }
                })
            }

            User.updateOne({_id:req.params.ID},{email:Object.email,color:Object.color,image:Image,username:Object.username},(err,obj)=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send(obj)
                }
            })
        }
    })
})
.delete((req,res)=>{
    User.deleteOne({_id:req.params.ID},(err,obj)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(obj)
        }
    })
})

//API - Spaces

app.route("/api/spaces")
.get((req,res)=>{
    Spaces.find((err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})
.post((req,res)=>{
    console.log(req.body)
    const Object = new Spaces({
        Members:req.body.Members,
        Events:[]
    })
    Object.save((err,obj)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(obj)
        }
    })
})

app.route("/api/space/:ID")
.get((req,res)=>{
    Spaces.findOne({_id:req.params.ID},(err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})
.patch((req,res)=>{
    Spaces.updateOne({_id:req.params.ID},{$set:{Members:req.body.Members,Events:req.body.Events}},(err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})
.delete((req,res)=>{
    Spaces.deleteOne({_id:req.params.ID},(err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})

//API - Events

app.route("/api/events")
.post((req,res)=>{
    const Object = new Event(req.body)
    Object.save((err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})

app.route("/api/event/:ID")
.get((req,res)=>{
    Event.findById(req.params.ID,(err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})
.patch((req,res)=>{
    Event.updateOne({_id:req.params.ID},{$set:{
        Organisateur:req.body.Organisateur,
        Participant:req.body.Participant,
        Titre:req.body.Titre,
        Durée:req.body.Durée,
        Date:req.body.Date,
        Description:req.body.Description
    }},(err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})
.delete((req,res)=>{
    Event.deleteOne({_id:req.params.ID},(err,obj)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(obj)
        }
    })
})



//Listening port

app.listen(8000|process.env.PORT,(req,res)=>{
    console.log("Serveur OK")
})



