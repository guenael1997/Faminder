const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SpaceSchema = new Schema({
    Members:Array,
    Events:Array
})

module.exports = mongoose.model("Space",SpaceSchema);