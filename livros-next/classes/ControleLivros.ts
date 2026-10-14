import { Livro } from './Livro';

const livros: Array<Livro> = [
  new Livro(
    1,
    1,
    'Código Limpo',
    'Princípios, padrões e boas práticas para escrever código legível, fácil de manter e de evoluir.',
    ['Robert C. Martin']
  ),
  new Livro(
    2,
    2,
    'Engenharia de Software',
    'Visão abrangente dos processos, métodos e técnicas para o desenvolvimento de sistemas de software.',
    ['Ian Sommerville']
  ),
  new Livro(
    3,
    3,
    'Padrões de Projeto',
    'Catálogo de 23 soluções reutilizáveis para problemas recorrentes no projeto orientado a objetos.',
    ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides']
  )
];

export class ControleLivros {
  obterLivros(): Array<Livro> {
    return livros;
  }

  // Sinônimo usado pelos componentes, conforme o enunciado
  obterTodos(): Array<Livro> {
    return this.obterLivros();
  }

  incluir(livro: Livro): void {
    const maiorCodigo = livros.length > 0 ? Math.max(...livros.map(l => l.codigo)) : 0;
    livro.codigo = maiorCodigo + 1;
    livros.push(livro);
  }

  excluir(codigo: number): void {
    const indice = livros.findIndex(l => l.codigo === codigo);
    if (indice >= 0) {
      livros.splice(indice, 1);
    }
  }
}

export default ControleLivros;
