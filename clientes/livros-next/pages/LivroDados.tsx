import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { Menu } from '../componentes/Menu';
import { Livro } from '../classes/Livro';
import { ControleEditora } from '../classes/ControleEditora';
import { ControleLivros } from '../classes/ControleLivros';

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivros();

const LivroDados: NextPage = () => {
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  const incluir = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const livro = new Livro(
      '',
      codEditora,
      titulo,
      resumo,
      autores.split('\n').map((a) => a.trim()).filter((a) => a.length > 0)
    );
    controleLivros.incluir(livro).then(() => Router.push('/LivroLista'));
  };

  return (
    <>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className="container">
        <h1>Dados do Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input type="text" className="form-control" id="titulo" value={titulo}
              onChange={(e) => setTitulo(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">Resumo</label>
            <textarea className="form-control" id="resumo" value={resumo}
              onChange={(e) => setResumo(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="codEditora" className="form-label">Editora</label>
            <select className="form-select" id="codEditora" value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">Autores (1 por linha)</label>
            <textarea className="form-control" id="autores" value={autores}
              onChange={(e) => setAutores(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Salvar Dados</button>
        </form>
      </main>
    </>
  );
};

export default LivroDados;
