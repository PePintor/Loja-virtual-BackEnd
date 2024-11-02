const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'pedro',
  password: 'Sai Daqui16',
  database: 'atore_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

module.exports = connection;