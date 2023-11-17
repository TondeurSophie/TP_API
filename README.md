# TP_API
Pour le rendu de projet, il faut chercher dans 2 branches. Une pour le front et une pour le back

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
