const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    Organisateur:String,
    Participants:Array,
    Titre:String,
    Date:String,
    Durée:Object,
    Description:String
})

module.exports = mongoose.model("Event",EventSchema);