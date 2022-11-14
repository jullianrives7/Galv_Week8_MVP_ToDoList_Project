DROP TABLE IF EXISTS sample_td_list;

CREATE TABLE sample_td_list (
    id serial PRIMARY KEY,
    list_item varchar,
    completion_status boolean
);


