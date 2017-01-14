CREATE TABLE admin(admin_id int(10) AUTO_INCREMENT NOT NULL,
admin_name varchar(50) NOT NULL,
password  varchar(60) NOT NULL,
primary key (admin_id));


insert into admin values(1,'admin','admin');


  CREATE TABLE fileimage(fileimage_id int(10) AUTO_INCREMENT NOT NULL,
  filepath varchar(1000) NOT NULL,
  pdfname  varchar(1000) NOT NULL,
  date     Date,
  imagepath varchar(1000),primary key (fileimage_id));
