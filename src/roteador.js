const express = require('express');
const { listarProdutos, getProdutobyID, calculaFrete } = require('./controladores/produtos');
const rotas = express();

rotas.get('/produtos',listarProdutos);
rotas.get('/produtos/:id',getProdutobyID);
rotas.get('/produtos/:id/frete/:cep',calculaFrete)
module.exports ={
  rotas
}