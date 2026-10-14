import Head from 'next/head';
import Link from 'next/link';
import { Menu } from '../componentes/Menu';

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className="container">
        <h1>Página Inicial</h1>
        <ul>
          <li><Link href="/LivroLista">Catálogo de livros</Link></li>
          <li><Link href="/LivroDados">Novo livro</Link></li>
        </ul>
      </main>
    </>
  );
}
