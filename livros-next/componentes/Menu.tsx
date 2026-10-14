import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
      <div className="container">
        <Link className="navbar-brand" href="/">Livros</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" href="/LivroLista">Catálogo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/LivroDados">Novo</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
