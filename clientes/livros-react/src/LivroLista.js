import { useEffect, useState } from 'react';
import ControleEditora from './controle/ControleEditora';
import ControleLivros from './controle/ControleLivros';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        {livro.titulo}
        <button className="btn btn-danger btn-sm d-block" onClick={() => excluir(livro.codigo)}>
          Excluir
        </button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      controleLivro.obterTodos().then((livros) => {
        setLivros(livros);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = (codigo) => {
    controleLivro.excluir(codigo).then(() => {
      setCarregado(false);
    });
  };

  return (
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
          {livros.map((livro, index) => (
            <LinhaLivro key={index} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
