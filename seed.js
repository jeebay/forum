var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
var _ = require('lodash');


var insertStatement = function (table, item) {
    // turn the key-pair values in the object into an array of tuples
    var itemIterable = Object.keys(item).map(function (key) {
        return [key, item[key]];
    });
    // unzip the column names and values to create an array of columns and an array of values
    var itemUnzipped = _.unzip(itemIterable);
    // create the columns portion of the insert statement
    var columns = itemUnzipped[0].reduce(function (previous, next) {
        return previous + ", " + next;
    });
    // create the values portion of the insert statement
    var values = itemUnzipped[1].reduce(function (previous, next) {
        return previous + ", " + next;
    });
    return "INSERT INTO "+table+" ("+columns+") VALUES ("+values+")";  
};


var makeParagraphs = function (blob, articleID) {
    return blob.split('\n').map(function (paragraph) {
        return {"article_id":articleID, "content":paragraph};
    });
};

var insertStatements = function (table, itemArray) {
    return itemArray.map(function (item) {
        return insertStatement(table, item)
    });
};

var paragraphObjects = makeParagraphs("Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa.\nCras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula.\nNulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.", 3);

var paragraphStatements = insertStatements("paragraphs", paragraphObjects);
var articleStatement = insertStatement("articles",{"title":"Connecticut ends death penalty","source_url":"http://www.reuters.com/article/2015/08/13/us-usa-connecticut-execution-idUSKCN0QI1YW20150813","user_id":1})

var comments = [
    {
        "user_id":1,
        "content":"hey man, great point. the system is rigged!",
        "paragraph_id":5
    },
    {
        "user_id":2,
        "content":"but how are we going to deter criminals?",
        "paragraph_id":5
    },
    {
        "user_id":3,
        "content":"there's no evidence that the death penalty deters capital crimes",
        "paragraph_id":5
    },
    {
        "user_id":1,
        "content":"if enough states determine that the death penalty is cruel and unsual then that could provide precedent for the US Supreme Court to also deem it so.",
        "paragraph_id":1
    },
    {
        "user_id":2,
        "content":"so, you're a fan of activist judges, eh?",
        "paragraph_id":1
    }
];

var commentStatements = insertStatements("comments", comments);


var createUsers = function () {
    db.run("INSERT INTO users (user_name, password) VALUES ('jeebay', 'bbbb'), ('georgie', 'gggg'), ('chief', 'cccc'), ('belle', 'eeee')", function (err) {
        if (err) {
            throw err;
        } else {
            console.log('created users')
        }
    });
};

// INSERT INTO articles (title, source_url, user_id) VALUES ('Yes, teflon does make you sick', 'https://firstlook.org/theintercept/2015/08/11/dupont-chemistry-deception/', 1)
// INSERT INTO articles (title, source_url, user_id) VALUES ('Athlete eats bacon wrapped checken', 'http://espn.go.com/blog/houston-texans/post/_/id/12059/bacon-wrapped-chicken-texans-jj-watt-eats-up-to-9000-calories-to-fuel', 1)
// INSERT INTO articles (title, source_url, user_id) VALUES ('Connecticut ends death penalty', 'http://www.reuters.com/article/2015/08/13/us-usa-connecticut-execution-idUSKCN0QI1YW20150813', 1)

// var createArticle = function () {
//     db.run(articleStatement, function (err) {
//         if (err) {
//             throw err;
//         } else {
//             console.log('created article');
//         }
//     });
// };

// var createParagraphs = function () {
//     paragraphStatements.forEach(function (paragraph) {
//         db.run(paragraph, function (err) {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log('created paragraphs');
//             }
//         });
//     });
// };

// var createComments = function () {
//     commentStatements.forEach(function (comment) {
//         db.run(comment, function (err) {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log('created comments');
//             }
//         });
//     });
// };

// createUsers();
// console.log(articleStatement);
console.log(paragraphStatements);
// createComments();