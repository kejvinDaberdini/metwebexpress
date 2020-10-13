BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `user` (
	`userID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`username`	TEXT NOT NULL,
	`email`		TEXT NOT NULL UNIQUE,
	`password`	TEXT NOT NULL,
	`creator`	INTEGER CHECK("creator" = 0 OR "creator" = 1)
);

CREATE TABLE IF NOT EXISTS `category` (
	`name`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	PRIMARY KEY(`name`)
);

CREATE TABLE IF NOT EXISTS `podcast` (
	`podcastID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`title`		TEXT NOT NULL,
	`creator`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	`category`	TEXT NOT NULL,
	`image`	TEXT NOT NULL,
	`creatorID`	INTEGER NOT NULL,
	FOREIGN KEY(`creatorID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	FOREIGN KEY(`category`) REFERENCES `category`(`name`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `follow` (
	`followID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`userID`	INTEGER NOT NULL,
	`podcastID`	INTEGER NOT NULL,
	FOREIGN KEY(`podcastID`) REFERENCES `podcast`(`podcastID`) ON DELETE CASCADE,
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	CONSTRAINT `UserPodcast` UNIQUE (`userID`,`podcastID`),
	
);

CREATE TABLE IF NOT EXISTS `episode` (
	`episodeID`		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`title`			TEXT NOT NULL,
	`file`			TEXT NOT NULL,
	`uploadDate`	DATE NOT NULL,
	`price`			REAL,
	`podcastID`		INTEGER NOT NULL,
	`description`	TEXT NOT NULL,
	`sponsor`		TEXT 

	FOREIGN KEY(`podcastID`) REFERENCES `podcast`(`podcastID`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `purchase` (
	`purchaseID`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`			TEXT NOT NULL,
	`surname`		TEXT NOT NULL,
	`cardType`		TEXT NOT NULL,
	`cardNumber`	INTEGER NOT NULL,
	`ccv`			INTEGER NOT NULL,
	`userID`		INTEGER NOT NULL,
	`episodeID`		INTEGER NOT NULL,
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`)ON DELETE CASCADE,
	FOREIGN KEY(`episodeID`) REFERENCES `episode`(`episodeID`)ON DELETE CASCADE,
	CONSTRAINT `UserEpisode` UNIQUE (`userID`,`episodeID`)
);

CREATE TABLE IF NOT EXISTS `favorite` (
	`favoriteID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`userID`	INTEGER NOT NULL,
	`episodeID`	INTEGER NOT NULL,
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	FOREIGN KEY(`episodeID`) REFERENCES `episode`(`episodeID`)ON DELETE CASCADE,
	CONSTRAINT `UserFavoriteEpisode` UNIQUE (`userID`,`episodeID`)
);


CREATE TABLE IF NOT EXISTS `comment` (
	`commentID`		INTEGER PRIMARY KEY AUTOINCREMENT,
	`commentText`	TEXT NOT NULL,
	`uploadDate`	DATE NOT NULL,
	`userID`		INTEGER NOT NULL,
	`episodeID`		INTEGER NOT NULL,
	FOREIGN KEY(`episodeID`) REFERENCES `episode`(`episodeID`)	ON DELETE CASCADE,
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`)			ON DELETE CASCADE
);









INSERT INTO `user` (username,email,password,creator) VALUES ('LorenzoRapetti','test1@gmail.com','$2b$04$wZOo.2vFPgzXSL.6Pq5aG.78afcGi/jP2w0Ea54xKE3U.AiDCk0N.',1);
INSERT INTO `user` (username,email,password,creator) VALUES ('kev','kev@gmail.com','$2b$04$g2OoDys88WgIFypRaPrUU.fHxO8rN9Ec4oi2KYfKboEd3hzPFYG12',1);
INSERT INTO `user` (username,email,password,creator) VALUES ('noncreator','noncreator@gmail.com','$2b$04$cwl7hPJkPvcFckLNp50AwepByfukoFh/Ex8AyQuJscIdD9kJwO7.y',0);


INSERT INTO `category` (name,description) VALUES ('Arts','Books, Design, Fashion & Beauty, Food, Performing Arts, Visual Arts');
INSERT INTO `category` (name,description) VALUES ('Business','Careers, Entrepreneurship, Investing, Management, Marketing, Non-profit.');
INSERT INTO `category` (name,description) VALUES ('Comedy','Comedy Interviews, Improv, Stand-Up');
INSERT INTO `category` (name,description) VALUES ('Education','Courses, How To, Language Learning, Self-Improvement');
INSERT INTO `category` (name,description) VALUES ('Fiction','Comedy Fiction, Drama, Science Fiction');
INSERT INTO `category` (name,description) VALUES ('History','history');
INSERT INTO `category` (name,description) VALUES ('Music','Music Commentary, Music History, Music Interviews');
INSERT INTO `category` (name,description) VALUES ('News','Business News, Daily News, Entertainment News, News Commentary, Politics, Sports News, Tech News');
INSERT INTO `category` (name,description) VALUES ('Science','Astronomy, Chemistry, Earth Sciences, Life Sciences, Mathematics, Natural Sciences, Nature, Physics, Social Sciences');

INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (1,'Stand up comedy','LorenzoRapetti','Ridi anche tu con i migliori spettacoli comici','Comedy','https://images2.imgbox.com/48/22/yc7VUl8B_o.jpg',1);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (2,'Gli antichi romani','LorenzoRapetti','Scopri anche tu i segreti dei romani','History','https://images2.imgbox.com/48/22/yc7VUl8B_o.jpg',1);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (3,'La grande guerra','LorenzoRapetti','I racconti della grande guerra','History','https://images2.imgbox.com/48/22/yc7VUl8B_o.jpg',1);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (8,'prova1','kev','descrizione1update','Arts','placeholder.png',2);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (13,'prova2','kev','descrizione podcast prova2','Education','placeholder.png',2);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (14,'prova5','kev','metalfeegegegeg','Business','placeholder.png',2);


INSERT INTO `follow` (followID,userID,podcastID) VALUES (1,1,8);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (2,1,3);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (3,1,2);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (4,2,2);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (9,2,1);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (10,2,3);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (11,3,8);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (12,3,13);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (13,3,14);



INSERT INTO `episode` (episodeID,title,file,uploadDate,podcastID,description,sponsor) VALUES (1,'I sette re di Roma','placeholder.png','09-09-2020',2,'scopri la storia della creazione di roma dai sui inizi fino al giulio cesare','Nerone');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description) VALUES (4,'ep1 prova1','placeholder.png','05-10-2020',5.99,8,'description example');


INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (1,'EDITED',06-10-2020,2,1);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (2,'yo mama is soo fat, she has her own gravity pull',06-10-2020,2,1);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (3,'hjighuig',06-10-2020,1,1);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (4,'hrt',06-10-2020,3,4);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (5,'parapallo',06-10-2020,2,1);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (6,'drhdr',06-10-2020,1,4);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (7,'dawfa',06-10-2020,3,4);

INSERT INTO `favorite` (favoriteID,userID,episodeID) VALUES (1,2,1);
INSERT INTO `favorite` (favoriteID,userID,episodeID) VALUES (2,2,1);
INSERT INTO `favorite` (favoriteID,userID,episodeID) VALUES (3,3,4);
COMMIT;
