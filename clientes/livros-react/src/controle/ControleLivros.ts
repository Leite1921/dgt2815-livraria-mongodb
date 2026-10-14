import { Livro } from '../model/Livro';

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
  _id: String | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export class ControleLivros {
  async obterLivros(): Promise<Array<Livro>> {
    const resposta = await fetch(baseURL, { method: 'GET' });
    const livrosMongo: Array<LivroMongo> = await resposta.json();
    return livrosMongo.map(
      (livro) => new Livro(livro._id ?? '', livro.codEditora, livro.titulo, livro.resumo, livro.autores)
    );
  }

  // Sinônimo usado pelos componentes, conforme o enunciado
  async obterTodos(): Promise<Array<Livro>> {
    return this.obterLivros();
  }

  async excluir(codigo: String): Promise<boolean> {
    const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    return resposta.ok;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };
    const resposta = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo)
    });
    return resposta.ok;
  }
}

export default ControleLivros;
