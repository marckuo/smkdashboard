var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/final';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE temp(id SERIAL PRIMARY KEY, value NUMERIC(10,5), created TIMESTAMP DEFAULT NOW())');
var query = client.query('CREATE TABLE humid(id SERIAL PRIMARY KEY, value NUMERIC(10,5), created TIMESTAMP DEFAULT NOW())');
var query = client.query('CREATE TABLE door(id SERIAL PRIMARY KEY, value BOOLEAN, created TIMESTAMP DEFAULT NOW())');
var query = client.query('CREATE TABLE coffee(id SERIAL PRIMARY KEY, value BOOLEAN, created TIMESTAMP DEFAULT NOW())');
query.on('end', function() { client.end(); });
