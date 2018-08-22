import pool from './dbconnect';

pool.query('CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, name VARCHAR(100) not null,  email VARCHAR(100) not null, password VARCHAR(100) not null)');
pool.query('CREATE TABLE IF NOT EXISTS Questions(id SERIAL PRIMARY KEY, title VARCHAR(100) not null, context TEXT not null, user_id INTEGER REFERENCES users)');
pool.query('CREATE TABLE IF NOT EXISTS Answers(id SERIAL PRIMARY KEY, answer TEXT not null, question_id INTEGER not null)');
