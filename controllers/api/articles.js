// Required Items 
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../../models/article');

// Get all of the Articles from within the Database 
router.get('/', function (req, res) {
    Article
        .find({})
        .exc(function (error, docs) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.status(200).json(docs);
            }
        });
});

// Get all of the Saved Articles 
router.get('./saved', function (req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populates('notes')
    exec(function (error, docs) {
        if (error) {
            console.log(error);
            res.status(500);
        } else {
            res.status(200).json(docs);
        }
    });
});

// Get all Deleted Articles 
router.get('./deleted', function (req, res) {
    Article
        .find({})
        .where('deleted').equals(true)
    exec(function (error, docs) {
        if (error) {
            console.log(error);
            res.status(500);
        } else {
            res.status(200).json(docs);
        }
    });
});

//The ability to Save an Article
router.post('/save/:id', function (req, res) {
    Article.findByIdAndUpdate(req.params.id, {
        $set: { saved: true }
    },
        { new: true },
        function (error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/');
            }
        });
});

// The ability to Delete a Saved Article 
router.delete('/:id', function (req, res) {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true } },
        { new: true },
        function (error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/saved');
            }
        }
    );
}); 

// The ability to Scrape Articles 
router.get('/scrape', function(req, res, next) {
    request('https://news.ycombinator.com', function(error, res, html) {
        let $ = cheerio.load(html); 
        let results = []; 
        $('tr.athing td.title').each(function(a, b) {
            let title = $(this).children('a').text(); 
            let link = $(this).children('a').attr('herf'); 
            let single = {}; 

            if (link !== undefined && link.includes('http') && title !== '') {
                single ={
                    title: title, 
                    link: link
                }; 
                //Craete a new Article 
                let entry = new Article(single); 
                //Save new Article to Database 
                entry.save(function(error, doc) {
                    if(error) {
                        if(!error.error.link) {
                            console.log(error); 
                        } else {
                            console.log('New Article has been added!'); 
                        }
                    }
                }); 
            }
        }); 
        next(); 
    }); 
}, function(req, res) {
    res.redirect('/'); 
}); 

module.exports = router; 