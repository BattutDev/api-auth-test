insert into "roles" (name) values ('user');
insert into "roles" (name) values ('premium');
insert into "roles" (name) values ('moderator');
insert into "roles" (name) values ('admin');
insert into "roles" (name) values ('root');

insert into "users" (login, mail, first_name, last_name, password, role) values ('jdoe', 'john@doe.com', 'john', 'doe', 'totoro', 'user');
insert into "users" (login, mail, first_name, last_name, password, role) values ('jsmith', 'john@smith.com', 'john', 'smith', 'totoro', 'premium');
insert into "users" (login, mail, first_name, last_name, password, role) values ('jdoe-2', 'jane@doe.com', 'jane', 'doe', 'totoro', 'moderator');
insert into "users" (login, mail, first_name, last_name, password, role) values ('jsmith-2', 'jane@smith.com', 'jane', 'smith', 'totoro', 'admin');
insert into "users" (login, mail, first_name, last_name, password, role) values ('abattut', 'antoine@battut.dev', 'antoine', 'battut', 'totoro', 'root');