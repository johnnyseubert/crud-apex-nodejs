const express = require("express");
const fetch = require('node-fetch');
const route = express.Router();

route.get('/', (req, res) => {
   fetch('http://localhost:3000/alunos', {
      method: "GET"
   }).then(response => response.json())
      .then(resJson => res.render('lista', { alunos: resJson }))
});



route.get('/cadastrar', (req, res) => {
   res.render('cadastrar');
})
route.post('/cadastrar', (req, res) => {

   let aluno = req.body.aluno;
   let nota1 = req.body.nota1;
   let nota2 = req.body.nota2;
   let valores = { aluno, nota1, nota2 }

   fetch('http://localhost:3000/alunos', {
      method: "post",
      body: JSON.stringify(valores),
      headers: { 'Content-Type': 'application/json ' }
   })
      .then(res.redirect('/'))
})



route.get('/excluir/:id', (req, res) => {
   let id = req.params.id;
   res.render('excluir', { id });
});
route.post('/excluir/:id', (req, res) => {
   let id = req.params.id;

   fetch(`http://localhost:3000/alunos/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json ' }
   })
      .then(res.redirect('/'));
})


route.get('/atualizar/:id', (req, res) => {
   let id = req.params.id;
   fetch(`http://localhost:3000/alunos/${id}`, {
      method: 'GET'
   })
      .then(response => response.json())
      .then(json => res.render('atualizar', json));
})
route.post('/atualizar/:id', (req, res) => {
   let id = req.body.id
   let aluno = req.body.aluno;
   let nota1 = req.body.nota1;
   let nota2 = req.body.nota2;
   let valores = { id, aluno, nota1, nota2 }
   fetch(`http://localhost:3000/alunos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(valores),
      headers: { 'Content-Type': 'application/json ' }
   }).then(res.redirect('/'));
})

module.exports = route;