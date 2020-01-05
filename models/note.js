// Required Items 
const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 

// Create the Schema for the Databaase 
const Schema = mongoose.Schema; 

const NoteSchema = new Schema({

     // Title 
     text: {
        type: String, 
        required: true
    }, 

     //Setting the Date for when it is added to Databade 
     date: {
        type: Date, 
       default: Date.now
    }
}); 

//Adding unique plugin 
NoteSchema.plugin(uniqueValidator); 

const Note = mongoose.model("Note", NoteSchema); 

module.exports = Note; 
