//require express and set up the server
var express = require('express');
var app = express();
// set up the database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
// require helpers and middleware
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended:false});
var _ = require('lodash');
// use body-parser and method-override in express server
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
// set the static folder to /static
app.use(express.static(__dirname + '/static'));

// db.execute('PRAGMA foreign_key = on');

// begin routes section
app.get('/', function (req, res) {
    db.all('SELECT users.user_name, users.id AS user_id,  articles.id AS article_id, articles.title, articles.source_url, articles.user_id, articles.date_created, paragraphs.content AS snippet FROM articles, users, paragraphs WHERE articles.id = paragraphs.article_id AND users.id = articles.user_id AND  paragraphs.paragraph_no = 1', function (err, articles) {
        if (err) {
            throw err;
        } else {
            db.all('SELECT * FROM users', function (err, users) {
                if (err) {
                    throw err;
                } else {
                    res.render('index.ejs', {"articles":articles, "users":users});
                }
            })
        }
    });
});

app.get('/users/:user', function (req, res) {
    db.get('SELECT * FROM users WHERE user_name=?', req.params.user, function (err, user) {
        if (user.length === 0) {
            res.redirect('/404');
        }
        db.all('SELECT * FROM articles INNER JOIN users ON users.id = articles.user_id WHERE users.id=?', user.id, function (err, articles) {
            res.render('user.ejs', {"user":user, "articles":articles});
        });
    });
});

app.get('/articles/new', function (req, res) {
    res.render('newarticle.ejs');
})

app.get('/articles/:article', function (req, res) {
    db.all('SELECT * FROM paragraphs WHERE article_id=? ORDER BY paragraphs.id ASC', parseInt(req.params.article), function (err, paragraphs) {
        db.get('SELECT * FROM articles WHERE articles.id=?',parseInt(req.params.article), function (err, article) {
            db.get('SELECT * FROM users WHERE users.id = ?',article.user_id, function (err, user) {
                res.render('article.ejs', {"paragraphs":paragraphs, "article":article, "user":user});
            });
        });
    });
});

app.get('/articles/:article/:paragraph', function (req, res ) {
    db.all('SELECT * FROM paragraphs INNER JOIN articles ON paragraphs.article_id = articles.id WHERE articles.id=? AND paragraph.id=?', req.params.article, req.params.paragraph, function (err, paragraph) {
        db.get('SELECT * FROM articles WHERE articles.id=?',req.params.article, function (err, article) {
            db.all('SELECT * FROM comments INNER JOIN conversations users.id = article.user_id', function (err, user) {
                res.render('paragraph.ejs', {"paragraphs":paragraph, "article":article, "user":user})
            });
        });
    });
})

app.get('/ajax/paragraphs/:id', function (req, res) {
    db.all('SELECT comments.*, users.user_name FROM comments, users WHERE comments.paragraph_id=? AND comments.user_id = users.id', parseInt(req.params.id), function (err, rows) {
        if (err) {
            throw err;
        } else {
            res.render('showcomments.ejs', {"comments":rows});
        }
    });
});

app.get('/ajax/checkuser', function (req, res) {
    db.get('SELECT * FROM users WHERE users.user_name=?', req.query.user_name, function (err, row) {
        var user = JSON.stringify(row)
        // console.log(user);
        res.send(row);
    });
});

app.post('/articles', function (req, res) {
    db.get('SELECT * FROM users WHERE users.user_name=?',req.body.user_name, function (err, user) {
        db.run('INSERT INTO articles (title, source_url, user_id) VALUES (?, ?, ?)', req.body.title, req.body.url, parseInt(user.id), function (err) {
            if (err) {
                throw err;
            } else {
                db.get('SELECT last_insert_rowid() AS article_id', function (err, rowid) {
                    var articleID = rowid.article_id;
                    var paragraphs = article.split(/[\n\r]{2,}/);
                    paragraphs.forEach(function (paragraph, index) {
                        db.run('INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (?, ?, ?)', articleID, (index+1), paragraph, function (err) {
                            if (err) {
                                throw err;
                            } else {
                                console.log('created paragraph');
                            }
                        })
                    });
                res.redirect('/');
                });
            }
        });
        console.log("title",req.body.title),
        console.log("source_url",req.body.url)
        console.log("user_id",user.id)
        var article = req.body.article_body;
        console.log(article.split(/[\n\r]{2,}/));

    })
})





// server listen on port 3000
app.listen(3000, function (){
    console.log('listening on port 3000');
});
