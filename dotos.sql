DROP DATABASE IF EXISTS dotos;
CREATE DATABASE dotos;

\c dotos;

CREATE TABLE todo (
  ID SERIAL PRIMARY KEY,
  title VARCHAR (50),
  complete BOOLEAN DEFAULT false
);

INSERT INTO todo (title, complete)
  VALUES ('make todo', false);
