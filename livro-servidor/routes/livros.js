const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await obterLivros());
  } catch (erro) {
    res.status(500).json({ ok: false, mensagem: 'Falha ao obter livros' });
  }
});

router.post('/', async (req, res) => {
  try {
    const livro = req.body;
    if (!livro._id) {
      delete livro._id;
    }
    await incluir(livro);
    res.json({ ok: true, mensagem: 'Livro incluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ ok: false, mensagem: 'Falha ao incluir livro' });
  }
});

router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    await excluir(codigo);
    res.json({ ok: true, mensagem: 'Livro excluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ ok: false, mensagem: 'Falha ao excluir livro' });
  }
});

module.exports = router;
