BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `user` (
	`userID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`username`	TEXT NOT NULL UNIQUE,
	`email`	TEXT NOT NULL UNIQUE,
	`password`	TEXT NOT NULL,
	`creator`	INTEGER CHECK("creator" = 0 OR "creator" = 1)
);
INSERT INTO `user` (userID,username,email,password,creator) VALUES (1,'creator1','creator1@email.com','$2b$04$lUE/2imMTMpssvndIGQiA.bXsRCD.zqYvaQUoKdE9skjn.ubXqiKm',1);
INSERT INTO `user` (userID,username,email,password,creator) VALUES (2,'notcreator1','notcreator1@email.com','$2b$04$YS7oHfevGwdVCN1XTwUXWuQSra2a/7Z04u/26MVObRUh1WmLhRrmC',0);
INSERT INTO `user` (userID,username,email,password,creator) VALUES (3,'creator2','creator2@email.com','$2b$04$zSxJbyvipdsMXipvlBkZVuZ42Kpe1Bgtwo0soVUTXZ8GAAcYAp34e',1);
CREATE TABLE IF NOT EXISTS `purchase` (
	`purchaseID`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT NOT NULL,
	`surname`	TEXT NOT NULL,
	`cardType`	TEXT NOT NULL,
	`cardDate`	TEXT NOT NULL,
	`cardNumber`	INTEGER NOT NULL,
	`cvv`	INTEGER NOT NULL,
	`userID`	INTEGER NOT NULL,
	`episodeID`	INTEGER NOT NULL,
	FOREIGN KEY(`episodeID`) REFERENCES `episode`(`episodeID`) ON DELETE CASCADE,
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	CONSTRAINT `UserEpisode` UNIQUE(`userID`,`episodeID`)
);
INSERT INTO `purchase` (purchaseID,name,surname,cardType,cardDate,cardNumber,cvv,userID,episodeID) VALUES (2,'John','Doe','1','05/25',5555444466663333,234,2,9);
CREATE TABLE IF NOT EXISTS `podcast` (
	`podcastID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`title`	TEXT NOT NULL,
	`creator`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	`category`	TEXT NOT NULL,
	`image`	TEXT NOT NULL,
	`creatorID`	INTEGER NOT NULL,
	FOREIGN KEY(`creatorID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	FOREIGN KEY(`category`) REFERENCES `category`(`name`) ON UPDATE CASCADE
);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (1,'Kids Of The Future ','creator1','In this family created comedy by Emmy nominated screenwriter/actor Rob Tinkler & his kids (Snoopy In Space, Cyberchase, Cat In The Hat Knows a Lot About That), two children come from the future to visit their lazy and flawed future father to try and ','Education','uploads/9b31ec5f3d0f4267ca81321fa3eb0835',1);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (2,' Café com ADM ','creator1','Eleito o Melhor Podcast de Negócios do mundo em 2019. Apresentado por Leandro Vieira, CEO do Administradores.com.','News','uploads/9ffc8f4e9e8ab01add27679b817180e5',1);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (3,'The Legendarium','creator1','Todd, Kenn, and Megan of the Blue Team sit down (remotely) to discuss Peace Talks, the sixteenth book in Jim Butcher''s Dresden Files series.','History','uploads/547762f68e65ed8d6c75e9d7f2f8082e',1);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (4,'The Chef and the Scribe Podcast ','creator2','An irreverent failed attempt at comedy that finds a way to offend everyone. Even worse it’s in AM radio. They’ve already been canceled by Cancel Culture but just keep on keepin’ on.','Comedy','uploads/54aabea36f82206fa601d63344612781',3);
INSERT INTO `podcast` (podcastID,title,creator,description,category,image,creatorID) VALUES (5,'The Sit Down with Mark and Joel ','creator2','The Sit Down is a show where we take music news and discuss what we think of it.','Music','uploads/5d9f80777cc7fb7fb7acfd64e039ba00',3);
CREATE TABLE IF NOT EXISTS `follow` (
	`followID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`userID`	INTEGER NOT NULL,
	`podcastID`	INTEGER NOT NULL,
	FOREIGN KEY(`podcastID`) REFERENCES `podcast`(`podcastID`) ON DELETE CASCADE,
	CONSTRAINT `UserPodcast` UNIQUE(`userID`,`podcastID`),
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`) ON DELETE CASCADE
);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (1,1,1);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (2,1,2);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (3,1,3);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (4,3,1);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (6,3,3);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (7,2,1);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (8,2,3);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (9,2,4);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (10,2,5);
INSERT INTO `follow` (followID,userID,podcastID) VALUES (11,2,2);
CREATE TABLE IF NOT EXISTS `favorite` (
	`favoriteID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`userID`	INTEGER NOT NULL,
	`episodeID`	INTEGER NOT NULL,
	CONSTRAINT `UserFavoriteEpisode` UNIQUE(`userID`,`episodeID`),
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	FOREIGN KEY(`episodeID`) REFERENCES `episode`(`episodeID`) ON DELETE CASCADE
);
INSERT INTO `favorite` (favoriteID,userID,episodeID) VALUES (9,1,11);
INSERT INTO `favorite` (favoriteID,userID,episodeID) VALUES (10,2,10);
CREATE TABLE IF NOT EXISTS `episode` (
	`episodeID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`title`	TEXT NOT NULL,
	`file`	TEXT NOT NULL,
	`uploadDate`	DATE NOT NULL,
	`price`	REAL,
	`podcastID`	INTEGER NOT NULL,
	`description`	TEXT NOT NULL,
	`sponsor`	TEXT,
	FOREIGN KEY(`podcastID`) REFERENCES `podcast`(`podcastID`) ON DELETE CASCADE
);
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (8,'The Sit Down 37 - The Anti-Queens','audiofiles/fd12d948352f75e69258a24a9b7eca02','02-11-2020',NULL,5,'This is episode 37 and we have punk rockers The Anti-Queens with us. We explore gators in Florida, Emily is at a drive-in concert, and we find out how Valerie''s bathroom rituals at festivals. Speaking... ','marc');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (9,'The Sit Down 36 - Chris Henderson','audiofiles/d50fda623c8cf72c375f28e591ae42fe','02-11-2020',6.0,5,'For episode 36, we''re joined by award-winning, Saskatchewan recording artist Chris Henderson. We talk about how he''s coping during the pandemic, the shows he''s about to play, if we''d be up for dating ... ','');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (10,'Yo Bro No','audiofiles/bf00d9e07389ff62fb7736ad68528d2d','02-11-2020',0.0,4,'Yo Bro No','');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (11,'Pizza My Away Get','audiofiles/ea3426a5d9256bb6a87d8372584eebcd','02-11-2020',4.0,1,'When the kids try to help Dad reverse past mistakes, they make every part of him move in reverse!','lilipuf');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (12,'Rabid Dad','audiofiles/b62750843d82e739b59e87357bc4875e','02-11-2020',0.0,1,'After getting bitten by a rabid raccoon, Dad refuses medical attention and soon goes on a rabid rampage himself! ','');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (13,'Dad’s Treehouse','audiofiles/ed27b5a9f372ddf86419c1c6bff7dca6','02-11-2020',16.0,1,'The Kids try to help Dad find a place to live, but Dad wants to live in his old treehouse.','mama');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (14,'Pilot - Helpful Kids, Hopeless Dad','audiofiles/bbe26e0f86c54043d64b93ddac7e58ad','02-11-2020',0.0,2,'The kids arrive to discover that their future Dad is a lazy layabout with many faults that desperately need fixing if they are to ever be born. Dad, of course, thinks he''s perfect as is and at all not interested in self improvement. ','');
INSERT INTO `episode` (episodeID,title,file,uploadDate,price,podcastID,description,sponsor) VALUES (15,'What’s Cookin’, Pops?','audiofiles/b96c764a687657e78454b72e1458c2e9','02-11-2020',0.0,3,'The Future Kids try to get to Dad learn to cook by helping him make a 7 course meal for Nana, but Dad has his own ideas about what good food is.','Polymorph');
CREATE TABLE IF NOT EXISTS `comment` (
	`commentID`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`commentText`	TEXT NOT NULL,
	`uploadDate`	DATE NOT NULL,
	`userID`	INTEGER NOT NULL,
	`episodeID`	INTEGER NOT NULL,
	FOREIGN KEY(`userID`) REFERENCES `user`(`userID`) ON DELETE CASCADE,
	FOREIGN KEY(`episodeID`) REFERENCES `episode`(`episodeID`) ON DELETE CASCADE
);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (1,'we talk to fellow Canadian music podcaster Limbo Joe from the Limbo Podcast. We talk about indie artists and their promotion, his job as a bouncer at a local music venue, vinyl record...','02-11-2020',3,9);
INSERT INTO `comment` (commentID,commentText,uploadDate,userID,episodeID) VALUES (2,'we talk to fellow Canadian music podcaster Limbo Joe from the Limbo Podcast. We talk about indie artists and their promotion, his job as a bouncer at a local music venue, vinyl record...EDITED','02-11-2020',3,8);
CREATE TABLE IF NOT EXISTS `category` (
	`name`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	PRIMARY KEY(`name`)
);
INSERT INTO `category` (name,description) VALUES ('Arts','Books, Design, Fashion & Beauty, Food, Performing Arts, Visual Arts');
INSERT INTO `category` (name,description) VALUES ('Business','Careers, Entrepreneurship, Investing, Management, Marketing, Non-profit.');
INSERT INTO `category` (name,description) VALUES ('Comedy','Comedy Interviews, Improv, Stand-Up');
INSERT INTO `category` (name,description) VALUES ('Education','Courses, How To, Language Learning, Self-Improvement');
INSERT INTO `category` (name,description) VALUES ('Fiction','Comedy Fiction, Drama, Science Fiction');
INSERT INTO `category` (name,description) VALUES ('History','history');
INSERT INTO `category` (name,description) VALUES ('Music','Music Commentary, Music History, Music Interviews');
INSERT INTO `category` (name,description) VALUES ('News','Business News, Daily News, Entertainment News, News Commentary, Politics, Sports News, Tech News');
INSERT INTO `category` (name,description) VALUES ('Science','Astronomy, Chemistry, Earth Sciences, Life Sciences, Mathematics, Natural Sciences, Nature, Physics, Social Sciences');
COMMIT;
