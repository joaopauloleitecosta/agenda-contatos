const express = require('express');
const app = express();
const db = require('./database'); //Importa o banco de dados
const port = 3000;

app.use(express.json());

let contatos = []; //lista de contatos na memória

//Rota para listar todos os contatos
app.get('/contatos', (req, res) => {
    const query = 'SELECT * FROM contatos';
    db.all(query, [], (err, rows) => {
        if (err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

//Rota para adicionar um novo contato
app.post('/contatos', (req, res) => {
    const { nome, email, telefone } = req.body;
    const query = 'INSERT INTO contatos (nome, email, telefone) VALUES (?,?,?)';
    const params = [nome, email, telefone];

    db.run(query, params, function (err){
        if (err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, nome, email, telefone });
    });
});

//Rota para atualizar um contato
app.put('/contatos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const query = 'UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?';
    const params = [nome, email, telefone, id];

    db.run(query, params, function (err) {
        if (err){
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Contato não encontrado' });
        }
        res.json({ id, nome, email, telefone });    
    });
    
});

//Rota para deletar um contato
app.delete('/contatos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contatos WHERE id = ?';

    db.run(query, id, function (err) {
        if (err){
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Contato não encontrado' });
        }
        res.json({ message: 'Contato deletado com sucesso' });    
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});