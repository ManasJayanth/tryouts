create schema backboneImgGallery;

use backboneImgGallery;

create table DATA(
	id int primary key,
	name varchar(32),
	src varchar(32),
	description varchar(128)
);