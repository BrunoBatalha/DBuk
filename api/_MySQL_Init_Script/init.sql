create table if not exists  dbuk_db.users (
	id int not null auto_increment,
	username varchar(50) not null unique,
	password varchar(255) not null,    
	createdAt datetime not null,
	updatedAt datetime not null,
	primary key(id),	
);

create if not exists table posts (


)
drop table dbuk_db.users;
select * from dbuk_db.users;