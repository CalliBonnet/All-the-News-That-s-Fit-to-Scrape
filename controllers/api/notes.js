// Required Items
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../../models/article');
const Note = require('../../models/note'); 

//Go and Get all of the notes 
router.get('/', function(req, res) {
    Note
    .find({})
    .exec(function(error, notes) {
        if(error) {
            console.log(error); 
            res.status(500); 
        } else {
            res.status(200).json(notes); 
        }
    }); 
}); 

//The ability to add a note to a saved Article 
router.post('/:id', function(req, res) {
    let newNote = new Note(req.body); 
    newNote.save(function(error, doc) {
        if(error) {
            console.log(error); 
            res.status(500); 
        } else {
            Article.findOneAndUpdate(
                { _id: req.params.id }, 
                { $push: {'notes': doc.id } }, 
                function(error, newDoc) {
                    if(error) {
                        console.log(error); 
                        res.status(500); 
                    } else {
                        res.redirect('/saved'); 
                    }
                }
            ); 
        }
    }); 
}); 

//The ability to delete a note from a saved article 
router.delete('/:id', function(req, res) {
    Note.findByIdAndRemove(req.params.id, function(error, note) {
        if(error) {
            console.log(error); 
            res.status(500); 
        } else {
            res.redirect('/saved'); 
        }
    }); 
}); 

module.exports = router; 