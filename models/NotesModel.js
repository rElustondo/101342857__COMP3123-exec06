const mongoose = require('mongoose')

var noteSchema = mongoose.Schema({
    noteTitle:{
        type: String,
        required:true,
    },
    noteDescription:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required: true
    },
    dateAdded:{
        type:String,
        required: true
    },
    dateUpdated:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('note',noteSchema)

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated