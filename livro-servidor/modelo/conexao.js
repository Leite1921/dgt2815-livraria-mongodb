const banco = require('mongoose');

const options = { useUnifiedTopology: true, useNewUrlParser: true };

banco.connect('mongodb://127.0.0.1:27017/livraria', options)
  .then(() => console.log('Conectado ao MongoDB (livraria)'))
  .catch((erro) => console.log('Falha ao conectar ao MongoDB:', erro.message));

module.exports = banco;
