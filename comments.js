// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use res.render to load up an ejs view file
// Home page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// About page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

// Comments page
app.get('/comments', function(req, res) {
    var data = fs.readFileSync('comments.json');
    var comments = JSON.parse(data);
    res.render('pages/comments', {
        comments: comments
    });
});

// Add comment
app.post('/comments', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    var comment = req.body.comment;
    var data = fs.readFileSync('comments.json');
    var comments = JSON.parse(data);
    comments.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});

// Delete comment
app.get('/delete/:id', function(req, res) {
    var data = fs.readFileSync('comments.json');
    var comments = JSON.parse(data);
    comments.splice(req.params.id, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});

app.listen(8080);
console.log('Server is running on http://localhost:8080/');