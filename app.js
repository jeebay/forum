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
    res.redirect('/articles/recent')
});

app.get('/articles/recent', function (req, res) {
// pass article data to EJS to render articles by date created descending
    db.all('SELECT users.user_name, users.id AS user_id,  articles.id AS article_id, articles.title, articles.source_url, articles.user_id, articles.date_created, paragraphs.content AS snippet, (SELECT COUNT(*) FROM comments, paragraphs  WHERE paragraphs.article_id = articles.id AND paragraphs.id = comments.paragraph_id) AS comment_count FROM articles, users, paragraphs WHERE articles.id = paragraphs.article_id AND users.id = articles.user_id AND paragraphs.paragraph_no = 1 ORDER BY articles.id DESC', function (err, articles) {
        if (err) {
            throw err;
        } else {
            db.all('SELECT * FROM users', function (err, users) {
                if (err) {
                    throw err;
                } else {
                    res.render('recent.ejs', {"articles":articles, "users":users});
                }
            });
        }
    });
});

// pass article data to EJS to render articles by number of comments
app.get('/articles/popular', function (req, res) {
   db.all('SELECT users.user_name, users.id AS user_id,  articles.id AS article_id, articles.title, articles.source_url, articles.user_id, articles.date_created, paragraphs.content AS snippet, (SELECT COUNT(*) FROM comments, paragraphs  WHERE paragraphs.article_id = articles.id AND paragraphs.id = comments.paragraph_id) AS comment_count FROM articles, users, paragraphs WHERE articles.id = paragraphs.article_id AND users.id = articles.user_id AND paragraphs.paragraph_no = 1 ORDER BY comment_count DESC', function (err, articles) {
        if (err) {
            throw err;
        } else {
            db.all('SELECT * FROM users', function (err, users) {
                if (err) {
                    throw err;
                } else {
                    res.render('popular.ejs', {"articles":articles, "users":users});
                }
            });
        }
    }); 
});

// Create new article page
app.get('/articles/new', function (req, res) {
    res.render('newarticle.ejs');
})

// View an article
app.get('/articles/:article', function (req, res) {
    db.all('SELECT paragraphs.*, (SELECT COUNT(*) FROM comments WHERE paragraphs.id = comments.paragraph_id) AS comment_count FROM paragraphs WHERE paragraphs.article_id=? ORDER BY paragraphs.id ASC', parseInt(req.params.article), function (err, paragraphs) {
        db.get('SELECT * FROM articles WHERE articles.id=?',parseInt(req.params.article), function (err, article) {
            db.get('SELECT * FROM users WHERE users.id = ?',article.user_id, function (err, user) {
                res.render('article.ejs', {"paragraphs":paragraphs, "article":article, "user":user});
            });
        });
    });
});

// // Route not currently used, to display a paragraph and related comments
// app.get('/articles/:article/:paragraph', function (req, res ) {
//     db.all('SELECT * FROM paragraphs INNER JOIN articles ON paragraphs.article_id = articles.id WHERE articles.id=? AND paragraph.id=?', req.params.article, req.params.paragraph, function (err, paragraph) {
//         db.get('SELECT * FROM articles WHERE articles.id=?',req.params.article, function (err, article) {
//             db.all('SELECT * FROM comments INNER JOIN conversations users.id = article.user_id', function (err, user) {
//                 res.render('paragraph.ejs', {"paragraphs":paragraph, "article":article, "user":user})
//             });
//         });
//     });
// });

// All users page
app.get('/users', function (req, res) {
    db.all('SELECT * FROM users', function (err, rows) {
        res.render('users.ejs', {"users":rows});
    });
});

// Create new user page
app.get('/users/new', function (req, res) {
    res.render('newuser.ejs');
});

// Display articles authored by a user and articles on their to-do list
app.get('/users/:user', function (req, res) {
    db.get('SELECT * FROM users WHERE user_name=?', req.params.user, function (err, user) {
        if (user.length === 0) {
            res.redirect('/404');
        }
        db.all('SELECT users.user_name, users.id AS user_id, articles.id AS article_id, articles.title, articles.source_url, articles.user_id, articles.date_created, paragraphs.content AS snippet, (SELECT COUNT(*) FROM comments, paragraphs  WHERE paragraphs.article_id = articles.id AND paragraphs.id = comments.paragraph_id) AS comment_count FROM articles, users, paragraphs WHERE users.id=? AND articles.id = paragraphs.article_id AND users.id = articles.user_id AND paragraphs.paragraph_no = 1 ORDER BY articles.id DESC', user.id, function (err, articles) {
            if (err) {
                throw err;
            } else {
                db.all('SELECT articles. * FROM articles, users, to_read WHERE to_read.article_id = articles.id AND to_read.user_id = users.id AND users.id=?', user.id, function (err, toread) {
                    res.render('user.ejs', {"user":user, "articles":articles, "toread":toread});
                });
            }
        });
    });
});

// AJAX request, returns a rendered partial view populated with comments
app.get('/ajax/paragraphs/:id', function (req, res) {
    db.all('SELECT comments.*, users.user_name FROM comments, users WHERE comments.paragraph_id=? AND comments.user_id = users.id', parseInt(req.params.id), function (err, rows) {
        if (err) {
            throw err;
        } else {
            res.render('showcomments.ejs', {"comments":rows});
        }
    });
});

// AJAX receives a username which is unique and returns the associated database row
app.get('/ajax/checkuser', function (req, res) {
    db.get('SELECT * FROM users WHERE users.user_name=?', req.query.user_name, function (err, row) {
        var user = JSON.stringify(row)
        // console.log(user);
        res.send(row);
    });
});

// Create new article
app.post('/articles', function (req, res) {
    db.get('SELECT * FROM users WHERE users.user_name=?',req.body.user_name, function (err, user) {
        db.run('INSERT INTO articles (title, source_url, user_id) VALUES (?, ?, ?)', req.body.title, req.body.url, parseInt(user.id), function (err) {
            if (err) {
                throw err;
            } else {
                // In the same database connection returns the id of the las created row, which in this case is the ID of the new article
                db.get('SELECT last_insert_rowid() AS article_id', function (err, rowid) {
                    var articleID = rowid.article_id;
                    // split the comment section based on two new line characters
                    var paragraphs = req.body.article_body.split(/[\n\r]{2,}/);
                    paragraphs.forEach(function (paragraph, index) {
                        db.run('INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (?, ?, ?)', articleID, (index+1), paragraph, function (err) {
                            if (err) {
                                throw err;
                            } else {
                                console.log('created paragraph');
                            }
                        });
                    });
                // after creating the article and paragraphs, redirect to the new article
                res.redirect('/articles/'+articleID);
                });
            }
        });
    });
});

// create a new user and redirect to users view
app.post('/users', function (req, res) {
    db.run('INSERT INTO users (user_name, password, img_url) VALUES (?, ?, ?)', req.body.user_name, req.body.password, req.body.img_url, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('added user');
            res.redirect('/users');
        }
    });
});

// create a new comment and redirect back to the same article 
app.post('/comments', function (req, res) {
    db.run('INSERT INTO comments (user_id, content, paragraph_id) VALUES (?, ?, ?)', parseInt(req.body.user_id,10), req.body.content, parseInt(req.body.paragraph_id,10), function (err) {
        if (err) {
            throw err;
        } else {
            console.log('added new comment');
            // extract the referer url from the req object
            var refererIndex = req.rawHeaders.indexOf('Referer');
            var referer = req.rawHeaders[refererIndex + 1]            
            res.redirect(referer);
        }
    });
});




// server listen on port 3000
app.listen(3000, function (){
    console.log('listening on port 3000');
});
