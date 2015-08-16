DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS paragraphs;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS comments;
PRAGMA foreign_keys = ON;
CREATE TABLE users (
	id INTEGER PRIMARY KEY autoincrement,
	user_name TEXT,
	password TEXT,
	img_url TEXT,
	UNIQUE (user_name) 
);
CREATE TABLE articles (
	id INTEGER PRIMARY KEY autoincrement,
	title TEXT,
	source_url TEXT,
	user_id INTEGER,
	date_created DATETIME DEFAULT current_timestamp,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE paragraphs (
	id INTEGER PRIMARY KEY autoincrement,
	article_id INTEGER,
	paragraph_no INTEGER,
	content TEXT,
	FOREIGN KEY (article_id) REFERENCES articles(id)
);
-- CREATE TABLE comment_comments (
-- 	id INTEGER PRIMARY KEY autoincrement,
-- 	comment_id INTEGER,
-- 	FOREIGN KEY (comment_id) REFERENCES comments(id)
-- );
CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	date_created DATETIME DEFAULT current_timestamp,
	user_id INTEGER,
	content TEXT,
	paragraph_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (paragraph_id) REFERENCES paragraphs(id)
);
INSERT INTO users (user_name, password) VALUES ('jeebay', 'bbbb'), ('georgie', 'gggg'), ('chief', 'cccc'), ('belle', 'eeee'), ('anonymous','aaaa');

INSERT INTO articles (title, source_url, user_id) VALUES ('Connecticut ends death penalty', 'http://www.reuters.com/article/2015/08/13/us-usa-connecticut-execution-idUSKCN0QI1YW20150813', 2);
INSERT INTO articles (title, source_url, user_id) VALUES ('Yes, teflon does make you sick', 'https://firstlook.org/theintercept/2015/08/11/dupont-chemistry-deception/', 1);
INSERT INTO articles (title, source_url, user_id) VALUES ('Athlete eats bacon wrapped chicken', 'http://espn.go.com/blog/houston-texans/post/_/id/12059/bacon-wrapped-chicken-texans-jj-watt-eats-up-to-9000-calories-to-fuel', 1);

INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (1, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (1, 2, "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (1, 2, "Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (1, 4, "Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (1, 5, "Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (1, 6, "Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (2, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (2, 2, "Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (3, 1, "Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (3, 2, "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (3, 3, "Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula.");
INSERT INTO paragraphs (article_id, paragraph_no, content) VALUES (3, 4, "Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.");
INSERT INTO comments (user_id, content, paragraph_id) VALUES (1, "hey man, great point. the system is rigged!", 5);
INSERT INTO comments (user_id, content, paragraph_id) VALUES (2, "but how are we going to deter criminals?", 5);
INSERT INTO comments (user_id, content, paragraph_id) VALUES (3, "there's no evidence that the death penalty deters capital crimes", 5);
INSERT INTO comments (user_id, content, paragraph_id) VALUES (1, "if enough states determine that the death penalty is cruel and unsual then that could provide precedent for the US Supreme Court to also deem it so.", 1);
INSERT INTO comments (user_id, content, paragraph_id) VALUES (2, "so, you're a communist?", 1);








