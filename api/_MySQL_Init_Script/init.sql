create table if not exists dbuk_db.users (
	id int not null auto_increment,
	username varchar(50) not null unique,
	password varchar(255) not null,    
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id)
);

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

insert into categories (title, createdAt, updatedAt)
values ('Comedy', now(), now());
insert into categories (title, createdAt, updatedAt)
values ('Technology', now(), now());
insert into categories (title, createdAt, updatedAt)
values ('News', now(), now());
insert into categories (title, createdAt, updatedAt)
values ('Cooking', now(), now());