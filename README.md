# TP_API
Pour le rendu de projet, il faut chercher dans 2 branches: Final_front et Final_back. C'est pour palier à un problème de fichiers portant le même nom et aux fichiers trop lourds.

Certaines fois, il faut relancer la connexion dans le terminal pour que tout s'affiche correctement.


BDD :
create database jeux_video;

use jeux_video;

create table utilisateurs (
-> id integer primary key auto_increment,
-> nom varchar (100),
-> email varchar (100),
-> mdp varchar(150));

create table jeux(
-> id_jeux integer primary key auto_increment,
-> titre varchar(100),
-> texte varchar(100),
-> prix int(11));

create table locations (
-> id_location integer primary key auto_increment,
-> id_utilisateur int,
-> foreign key (id_utilisateur) references utilisateurs (id),
-> id_jeux int,
-> foreign key (id_jeux) references jeux (id_jeux),
-> date_emprunt datetime,
-> date_retour datetime,
-> note int,
-> commentaires varchar(100));

INSERT INTO utilisateurs values (2,"morgane","morgane@test.test","mdp");
INSERT INTO utilisateurs values (1,"sophie","s.tondeur@test.test","mdp");
insert into jeux values (1, "Mario Party", "Il y a plein de mini-jeux avec Mario et ces amis", 40);
insert into jeux values (2, "Minecraft", "C'est un jeux d'aventure et de construction",50);
insert into jeux values (3, "Mario Kart", "Tu choisis ta voiture, ton personnage, et tu joue a des courses ou mini-jeux",45);
insert into jeux values (4,"Smash bros Ultimate", "Jeux de combat avec des personnages d'arcade et/ou jeux vidéo", 90);
insert into jeux values (5, "Pac-Man", "Jeux avec des fantômes. Pac-Man doit les éviter, manger pour prendre des forces", 20);
insert into jeux values (6, "Tetris", "Tu dois embriquer des formes sans atteindre le haut.",25);
insert into locations values (1,1,1,"2012-12-26","2014-12-27",4,"Ce jeux est plutot bien");
insert into locations values (2,2,4,"2023-01-12","2023-12-24",3,"Ce jeux est compliqué, mais amusant");
