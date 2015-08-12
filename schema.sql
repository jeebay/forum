DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS paragraphs;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS comments;
PRAGMA foreign_keys = ON;
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	user_name TEXT,
	password TEXT,
	img_url TEXT
);
CREATE TABLE articles (
	id INTEGER PRIMARY KEY,
	title TEXT,
	full_text TEXT,
	source_url TEXT,
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE paragraphs (
	id INTEGER PRIMARY KEY,
	article_id INTEGER,
	content TEXT,
	conversation_id INTEGER,
	FOREIGN KEY (article_id) REFERENCES articles(id),
	FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);
CREATE TABLE conversations (
	id INTEGER PRIMARY KEY
);
CREATE TABLE comments (
	id INTEGER PRIMARY KEY,
	date_created DATETIME DEFAULT current_timestamp,
	user_id INTEGER,
	content TEXT,
	conversation_id INTEGER,
	metaconvo_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (conversation_id) REFERENCES conversations(id),
	FOREIGN KEY (metaconvo_id) REFERENCES conversations(id)
);
