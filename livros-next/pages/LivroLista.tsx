import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import { Livro } from '../classes/Livro';

const baseURL = 'http://localhost:3000/api/livros';

const obter = async (): Promise<Array<Livro>> => {
  const resposta = await fetch(baseURL);
  return await resposta.json();
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
  const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
  return resposta.ok;
};

const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      obter().then((livros) => {
        setLivros(livros);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = (codigo: number) => {
    excluirLivro(codigo).then(() => setCarregado(false));
  };

  return (
    <>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className="container">
        <h1>Catálogo de Livros</h1>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default LivroLista;
