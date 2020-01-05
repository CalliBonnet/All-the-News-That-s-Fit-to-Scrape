// Required Items 
const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 

// Create the Schema for the Databaase 
const Schema = mongoose.Schema; 

// Create the article Schema
const ArticleSchema = new Schema ({
   
    //Article Title 
    title: {
        type: String, 
        required: true
    }, 

    //Link to the Article 
    link: {
        type: String, 
        unique: true,
        required: true
    }, 

    //Save the article or do not save the article 
    saved: {
        type: Boolean, 
        required: true, 
        default: false
    }, 

     //Delete the article or do not save the article 
     deleted: {
        type: Boolean, 
        required: true, 
        default: false
    }, 

     //Date that Article was added to Database
     date: {
        type: Date, 
        default: Date.now
    }, 

     //notes 
     notes: [{
        type: Schema.Types.ObjectId, 
        ref: "Note", 
        required: false
    }] 
}); 

//Making the articles unique 
ArticleSchema.plugin(uniqueValidator); 

const Article = mongoose.model("Article", ArticleSchema); 

module.exports = Article; 