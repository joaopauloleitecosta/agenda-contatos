const sqlite3 = require('sqlite3').verbose();

//Cria ou abre o banco de dados 'agenda.db'
const db = new sqlite3.Database('./agenda.db', (err) => {
    if (err){
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

//Cria a tabela de contatos, se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT NOT NULL    
    )`);
});

module.exports = db;