'use strict';

const express = require('express');
const connection = require("./connection");
var faker = require('faker');

connection.query(`
CREATE DATABASE IF NOT EXISTS FULL_CYCLE;
`);
connection.query(`
USE FULL_CYCLE;
`);
connection.query(`
CREATE TABLE IF NOT EXISTS people(
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;`);



// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {

  connection.query("INSERT INTO people (name) VALUES (?)", [ [faker.name.findName()] ], function(err, rows, fields) {
    if (err) {
      res.send(`Erro: ${JSON.stringify(err)}`);
      return;
    }

    connection.query("SELECT * FROM people ORDER BY id DESC", function (err, result, fields) {
      if (err) {
        res.send("ocorreu um erro");
        return;
      }

      const list = result.map(item => `<li>${item.name} | id: ${item.id}</li>`).join('');

      res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${list}
      </ul>
      `);
    });    


  });  
  
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

