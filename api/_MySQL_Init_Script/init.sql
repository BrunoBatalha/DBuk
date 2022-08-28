create table if not exists  dbuk_db.users (
	id int not null auto_increment,
	username varchar(50) not null unique,
	password varchar(255) not null,    
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id),	
);

create if not exists table dbuk_db.posts (
	id int not null auto_increment,
	userId int not null,
	image blob not null,
	primary key(id),
	foreign key (userId) references dbuk_db.users(userId)
)
-- TODO: create constraint to posts foreign key
drop table dbuk_db.users;
select * from dbuk_db.users;