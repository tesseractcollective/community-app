create extension postgis;

ALTER TABLE location
  ADD location geometry
    GENERATED ALWAYS AS (st_makepoint(longitude, latitude)) STORED;

create extension citext;

alter table location alter column city type citext;
alter table location alter column country type citext;
alter table location alter column name type citext;
alter table location alter column state type citext;

alter table "group" alter column name type citext;
alter table "group" alter column description type citext;