# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table product (
  id                            integer auto_increment not null,
  name                          varchar(50) not null,
  price                         integer(10) not null,
  isdeleted                     tinyint(1) default 0 not null,
  updated_by_id                 integer,
  type_id                       integer,
  created_by_id                 integer not null,
  added_date                    datetime(6) not null,
  updated_date                  datetime(6),
  constraint pk_product primary key (id)
);

create table product_type (
  id                            integer auto_increment not null,
  type_name                     varchar(50) not null,
  isdeleted                     tinyint(1) default 0 not null,
  updated_by_id                 integer,
  created_by_id                 integer not null,
  added_date                    datetime(6) not null,
  updated_date                  datetime(6),
  constraint pk_product_type primary key (id)
);

create table transactions (
  id                            integer auto_increment not null,
  quantity                      integer(10) not null,
  total_paid                    integer(30) not null,
  buyer_name                    varchar(50),
  isdeleted                     tinyint(1) default 0 not null,
  updated_by_id                 integer,
  issued_by_id                  integer not null,
  product_id                    integer not null,
  issued_date                   datetime(6) not null,
  updated_date                  datetime(6),
  constraint pk_transactions primary key (id)
);

create table user (
  id                            integer auto_increment not null,
  user                          varchar(50) not null,
  auth_token                    varchar(255) not null,
  position_id                   integer,
  password                      varchar(50) not null,
  isdeleted                     tinyint(1) default 0 not null,
  updated_by_id                 integer,
  created_by_id                 integer,
  added_date                    datetime(6),
  updated_date                  datetime(6),
  constraint uq_user_position_id unique (position_id),
  constraint pk_user primary key (id)
);

create table user_type (
  id                            integer auto_increment not null,
  type_name                     varchar(50) not null,
  isdeleted                     tinyint(1) default 0 not null,
  updated_by_id                 integer,
  created_by_id                 integer,
  created_date                  datetime(6),
  updated_date                  datetime(6),
  constraint pk_user_type primary key (id)
);

alter table product add constraint fk_product_updated_by_id foreign key (updated_by_id) references user (id) on delete restrict on update restrict;
create index ix_product_updated_by_id on product (updated_by_id);

alter table product add constraint fk_product_type_id foreign key (type_id) references product_type (id) on delete restrict on update restrict;
create index ix_product_type_id on product (type_id);

alter table product add constraint fk_product_created_by_id foreign key (created_by_id) references user (id) on delete restrict on update restrict;
create index ix_product_created_by_id on product (created_by_id);

alter table product_type add constraint fk_product_type_updated_by_id foreign key (updated_by_id) references user (id) on delete restrict on update restrict;
create index ix_product_type_updated_by_id on product_type (updated_by_id);

alter table product_type add constraint fk_product_type_created_by_id foreign key (created_by_id) references user (id) on delete restrict on update restrict;
create index ix_product_type_created_by_id on product_type (created_by_id);

alter table transactions add constraint fk_transactions_updated_by_id foreign key (updated_by_id) references user (id) on delete restrict on update restrict;
create index ix_transactions_updated_by_id on transactions (updated_by_id);

alter table transactions add constraint fk_transactions_issued_by_id foreign key (issued_by_id) references user (id) on delete restrict on update restrict;
create index ix_transactions_issued_by_id on transactions (issued_by_id);

alter table transactions add constraint fk_transactions_product_id foreign key (product_id) references product (id) on delete restrict on update restrict;
create index ix_transactions_product_id on transactions (product_id);

alter table user add constraint fk_user_position_id foreign key (position_id) references user_type (id) on delete restrict on update restrict;

alter table user add constraint fk_user_updated_by_id foreign key (updated_by_id) references user (id) on delete restrict on update restrict;
create index ix_user_updated_by_id on user (updated_by_id);

alter table user add constraint fk_user_created_by_id foreign key (created_by_id) references user (id) on delete restrict on update restrict;
create index ix_user_created_by_id on user (created_by_id);

alter table user_type add constraint fk_user_type_updated_by_id foreign key (updated_by_id) references user (id) on delete restrict on update restrict;
create index ix_user_type_updated_by_id on user_type (updated_by_id);

alter table user_type add constraint fk_user_type_created_by_id foreign key (created_by_id) references user (id) on delete restrict on update restrict;
create index ix_user_type_created_by_id on user_type (created_by_id);


# --- !Downs

alter table product drop foreign key fk_product_updated_by_id;
drop index ix_product_updated_by_id on product;

alter table product drop foreign key fk_product_type_id;
drop index ix_product_type_id on product;

alter table product drop foreign key fk_product_created_by_id;
drop index ix_product_created_by_id on product;

alter table product_type drop foreign key fk_product_type_updated_by_id;
drop index ix_product_type_updated_by_id on product_type;

alter table product_type drop foreign key fk_product_type_created_by_id;
drop index ix_product_type_created_by_id on product_type;

alter table transactions drop foreign key fk_transactions_updated_by_id;
drop index ix_transactions_updated_by_id on transactions;

alter table transactions drop foreign key fk_transactions_issued_by_id;
drop index ix_transactions_issued_by_id on transactions;

alter table transactions drop foreign key fk_transactions_product_id;
drop index ix_transactions_product_id on transactions;

alter table user drop foreign key fk_user_position_id;

alter table user drop foreign key fk_user_updated_by_id;
drop index ix_user_updated_by_id on user;

alter table user drop foreign key fk_user_created_by_id;
drop index ix_user_created_by_id on user;

alter table user_type drop foreign key fk_user_type_updated_by_id;
drop index ix_user_type_updated_by_id on user_type;

alter table user_type drop foreign key fk_user_type_created_by_id;
drop index ix_user_type_created_by_id on user_type;

drop table if exists product;

drop table if exists product_type;

drop table if exists transactions;

drop table if exists user;

drop table if exists user_type;

