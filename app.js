//require express and set up the server
var express = require('express');
var app = express();
// set up the database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('characters.db');
// require helpers and middleware
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('methodOverride');
var urlencodedBodyParser = bodyParser.urlencoded({extended:false});
var _ = require('lodash');
// use body-parser and method-override in express server
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
// set the static folder to /static
app.use(express.static(__dirname + '/static'));

// begin routes section

app.













// server listen on port 3000
app.listen(3000, function (){
    console.log('listening on port 3000');
});
