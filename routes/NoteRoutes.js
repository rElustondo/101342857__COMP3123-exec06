const express = require('express')
const NotesModel = require('../models/NotesModel.js');
var app = express.Router()
app.use(express.json())
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
    if(req.body == undefined) {
        return res.status(400).send({
            message: "Note Object can not be empty"
        });
    }
    if(req.body.priority !== "HIGH" && req.body.priority !== "MEDIUM" && req.body.priority !== "LOW"){
        return res.status(400).send({
            message: "priority must be LOW MEDIUM or HIGH"
        });
    }
    var newNote = new NotesModel({
        ...req.body
    })

    await newNote.save()
    res.status(200).json(newNote)
    //TODO - Write your code here to save the note
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    var notesList = await NotesModel.find()
    res.status(200).json(notesList)
    //TODO - Write your code here to returns all note
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.params.noteId) {
        return res.status(400).send({
            message: "Note id can not be empty"
        });
    }
    try {
        let noteId = req.params.noteId
        let note = await NotesModel.findById(noteId)
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json(error)
    }

    //TODO - Write your code here to return onlt one note using noteid
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(req.body == undefined) {
        return res.status(400).send({
            message: "Note object can not be empty"
        });
    }
    try {
        const updatedNote = await NotesModel.findByIdAndUpdate(req.params.noteId, req.body)
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json(error)
    }
    //TODO - Write your code here to update the note using noteid
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    try{
        let noteId = req.params.noteId
        if(noteId == undefined){
            res.status(500).json({status:false,message:'note id required as parameter'})
        }
        const note = await NotesModel.findOneAndDelete(noteId)
        if(!note){
            res.status(200).send({status:false, message: "Note Not found"})
        }
        else{
            res.status(200).send(note)
        }
    }catch(error){
        res.status(500).send(error)
    }
    //TODO - Write your code here to delete the note using noteid
});

module.exports = app