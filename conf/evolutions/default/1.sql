# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table user (
  id                            integer auto_increment not null,
  user                          varchar(50) not null,
  position                      varchar(50) not null,
  password                      varchar(50) not null,
  isdeleted                     tinyint(1) default 0 not null,
  updated_by_id                 integer,
  created_by_id                 integer,
  constraint pk_user primary key (id)
);

alter table user add constraint fk_user_updated_by_id foreign key (updated_by_id) references user (id) on delete restrict on update restrict;
create index ix_user_updated_by_id on user (updated_by_id);

alter table user add constraint fk_user_created_by_id foreign key (created_by_id) references user (id) on delete restrict on update restrict;
create index ix_user_created_by_id on user (created_by_id);


# --- !Downs

alter table user drop foreign key fk_user_updated_by_id;
drop index ix_user_updated_by_id on user;

alter table user drop foreign key fk_user_created_by_id;
drop index ix_user_created_by_id on user;

drop table if exists user;

