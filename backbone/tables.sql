create schema backboneImgGallery;

use backboneImgGallery;

create table DATA(
	id int primary key,
	name varchar(32),
	src varchar(32),
	description varchar(128)
);

INSERT INTO DATA VALUES(1, 'Smartphones', 'img/mobile.png', 'A smartphone in hand');
INSERT INTO DATA VALUES(2, 'Friends', 'img/friends4.jpg', 'Friends cast');