// Required Items 
const express = require('express'); 
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser'); 
const logger = require('morgan'); 
const mongoose = require('mongoose'); 
const methodOverride = require('method-override'); 

// Express App 
const PORT = process.env.PORT || 8000; 
let app = express(); 

app 
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended:true }))
    .use(bodyParser.text())
    .use(express.static(__dirname + './public'))
    .engine('handlebars', exphbs({ defaultLayout: 'main '}))
    .set('view engine', 'handlebars')
    .use(require('./controllers')); 

// Configure Mongoose 
mongoose.Promise = Promise; 

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017//newsArticles"; 

mongoose.set('userCreateIndex', true)
mongoose.connect(dbURI, { userNewURLParser: true }); 

// Popupate mongoose errors 
db.on('error', function(error) {
    console.log("There is a Mongoose Error: ", error); 
})

// Mongoose Suceess Message 
db.once('open', function() {
    console.log("Mongoose Connection was Successful!"); 

    // Start the server
    app.listen(PORT, function() {
        console.log("Server is running on: http://localhost:" + {PORT})
    })
}); 

module.exports = app; 