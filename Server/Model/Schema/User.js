const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    active:Boolean,
    email:String,
    image:String,
    color:String,
    spaces:Array
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);