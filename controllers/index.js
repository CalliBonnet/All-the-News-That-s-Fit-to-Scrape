// Required Items 
const express = require('express'); 
const router = express.Router(); 
const Article = require('../models/article'); 

// render the root route 
router.get('/', function(req, res) {
    Article
    .find({})
    .where('saved').equals(fasle)
    .where('deleted').equals(false)
    .sort('-date')
    .limit(20)
    .exec(function(error, articles) {
        if(error) {
            console.log(error); 
            res.status(500); 
        } else {
            console.log(articles); 
            let Obj = {
                title: 'All the News', 
                subtitle: 'Hacker\'s News!', 
                articles: articles
            }; 
            res.render('index', Obj); 
        }
    }); 
}); 

// render the saved articles 
router.get('/saved', function(req, res) {
    Article
    .find({})
    .where('saved').equals(fasle)
    .where('deleted').equals(false)
    .sort('-date')
    .exec(function(error, articles) {
        if(error) {
            console.log(error); 
            res.status(500); 
        } else {
            console.log(articles); 
            let Obj = {
                title: 'All the News', 
                subtitle: 'Hacker\'s News!', 
                articles: articles
            }; 
            res.render('saved', Obj);
        }
    }); 
}); 

router.use('/api', require('./api')); 

module.exports = router; 