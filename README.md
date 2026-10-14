# DGT2815 — Integração de Páginas Web com Banco de Dados

Servidor Express + Mongoose + MongoDB (`livro-servidor`) consumido por três clientes (`clientes/livros-react`, `clientes/livros-next` e `clientes/livros-angular`).

## Pré-requisitos

- Node.js 24 e npm 11 (testado com v24.14.1 e 11.11.0)
- MongoDB rodando em `mongodb://127.0.0.1:27017`:
  ```
  brew services start mongodb-community
  mongosh --eval 'db.version()'
  ```
- Banco `livraria` com a coleção `livros` (já criados; para recriar: `mongosh` → `use livraria` → `db.createCollection('livros')`)
- Dependências instaladas: `npm install` em `livro-servidor/` e em cada pasta de `clientes/`

## Ordem de execução

| # | O quê | Comando | Porta |
|---|-------|---------|-------|
| 1 | Servidor | `cd livro-servidor && npm start` | 3030 |
| 2a | React **ou** Next (um de cada vez, ambos usam a 3000) | `cd clientes/livros-react && npm start` / `cd clientes/livros-next && npm run dev` | 3000 |
| 2b | Angular (pode rodar junto com o 2a) | `cd clientes/livros-angular && npx ng serve` | 4200 |

URLs: React `http://localhost:3000/` (lista) e `/dados`; Next `http://localhost:3000/LivroLista` e `/LivroDados`; Angular `http://localhost:4200/lista` e `/dados`.

## Testes da API com curl

```
curl http://localhost:3030/livros
curl -X POST http://localhost:3030/livros -H 'Content-Type: application/json' \
  -d '{"titulo":"Livro X","codEditora":1,"resumo":"...","autores":["Autor"]}'
curl -X DELETE http://localhost:3030/livros/<_id>
```

## Checklist do enunciado

### 1º Procedimento — Servidor

| Item | Onde |
|------|------|
| Banco `livraria` / coleção `livros` | MongoDB local (criado via `mongosh`) |
| Projeto `express -e livro-servidor` + mongoose + cors | `livro-servidor/package.json` |
| `banco`, `options`, `connect` em `127.0.0.1` | `livro-servidor/modelo/conexao.js` |
| `LivroSchema`, `Livro` amarrado à coleção `livros` | `livro-servidor/modelo/livro-schema.js` |
| `obterLivros`, `incluir`, `excluir` (arrow functions assíncronas) | `livro-servidor/modelo/livro-dao.js` |
| GET `/`, POST `/`, DELETE `/:codigo` | `livro-servidor/routes/livros.js` |
| Porta 3030 | `livro-servidor/bin/www` |
| `cors`, `livroRouter`, `app.use('/livros', ...)` | `livro-servidor/app.js` |

### 2º Procedimento — Clientes

| Item | React | Next | Angular |
|------|-------|------|---------|
| `codigo: String` | `src/model/Livro.ts` | `classes/Livro.ts` | `src/app/livro.ts` |
| `baseURL`, `LivroMongo`, sem vetor, métodos assíncronos | `src/controle/ControleLivros.ts` | `classes/ControleLivros.ts` | `src/app/controle-livros.service.ts` |
| Lista: `useEffect`/`ngOnInit` com `.then`; excluir com `.then`; `key={index}` | `src/LivroLista.js` | `pages/LivroLista.tsx` | `src/app/livro-lista/livro-lista.component.ts` |
| Inclusão com código `''` e navegação no `.then` | `src/LivroDados.js` | `pages/LivroDados.tsx` | `src/app/livro-dados/livro-dados.component.ts` |
| API interna removida (`baseURL` local e funções de fetch) | — | `pages/LivroLista.tsx`, `pages/LivroDados.tsx`, `pages/api/livros/` apagada | — |

Decisões e observações: ver `RELATORIO.md`.
