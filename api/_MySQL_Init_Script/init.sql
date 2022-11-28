create table if not exists dbuk_db.users (
	id int not null auto_increment,
	username varchar(50) not null unique,
	password varchar(255) not null,    
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id)
);

insert into dbuk_db.users (username, password, createdAt, updatedAt)
values ('root', 'root', now(), now());

insert into dbuk_db.users (username, password, createdAt, updatedAt)
values ('root1', 'root1', now(), now());

create table if not exists dbuk_db.posts (
	id int not null auto_increment,
	userId int not null,
	imageUri varchar(100) not null,
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id),
	constraint FK_usersPosts foreign key (userId) references dbuk_db.users(id)
);

create table if not exists dbuk_db.categories (
	id int not null auto_increment,
	title varchar(50) not null unique,
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id)	
);

create table if not exists dbuk_db.posts_categories (
	id int not null auto_increment,
	postId int not null,
	categoryId int not null,
	primary key(id),
	constraint FK_posts_categories_category foreign key (categoryId) references dbuk_db.categories(id),
	constraint FK_posts_categories_post foreign key (postId) references dbuk_db.posts(id)
);

insert into dbuk_db.categories (title, createdAt, updatedAt)
values ('Comedy', now(), now());
insert into dbuk_db.categories (title, createdAt, updatedAt)
values ('Technology', now(), now());
insert into dbuk_db.categories (title, createdAt, updatedAt)
values ('News', now(), now());
insert into dbuk_db.categories (title, createdAt, updatedAt)
values ('Cooking', now(), now());


create table if not exists dbuk_db.reactions (
	id int not null auto_increment,
	title varchar(50) not null unique,
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id)	
);

insert into dbuk_db.reactions (title, createdAt, updatedAt)
values ('Like', now(), now());

create table if not exists dbuk_db.posts_users_reactions (
	userId int not null,
	postId int not null,
	reactionId int not null,
	primary key(userId, postId),
	constraint FK_posts_users_reactions_users foreign key (userId) references dbuk_db.users(id),
	constraint FK_posts_users_reactions_posts foreign key (postId) references dbuk_db.posts(id),
	constraint FK_posts_users_reactions_reactions foreign key (reactionId) references dbuk_db.reactions(id)
);


-- create table if not exists dbuk_db.reactions_users (
-- 	id int not null auto_increment,
-- 	reactionId int not null,
-- 	userId int not null,
-- 	primary key(id),
-- 	constraint FK_reactions_users_user foreign key (userId) references dbuk_db.users(id),
-- 	constraint FK_reactions_users_reaction foreign key (reactionId) references dbuk_db.reactions(id)
-- );
