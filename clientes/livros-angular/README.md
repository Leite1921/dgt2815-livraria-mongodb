# Catálogo de Livros (DGT2809)

Trabalho prático da disciplina DGT2809: catálogo de livros em Angular, com NgModule, serviços injetáveis, rotas e formulário com `ngModel`.

- Angular 20 (CLI 20.3), com projeto NgModule (`--no-standalone`). O Angular 18 não suporta o Node 24 usado no desenvolvimento.
- Os arquivos foram renomeados/gerados com os sufixos clássicos (`app.module.ts`, `*.component.ts`, `*.service.ts`) para seguir o enunciado.
- Bootstrap 5.3.3 via CDN em `src/index.html`.

## Como instalar

```bash
npm install
```

## Como rodar

```bash
npx ng serve
```

Acesse http://localhost:4200/. A raiz redireciona para `/lista`.

Para gerar o build: `npx ng build`.

## Checklist do enunciado

### 1º Procedimento: listagem de livros

| Item | Arquivo |
| --- | --- |
| Classe `Editora` (`codEditora`, `nome`) | `src/app/editora.ts` |
| Classe `Livro` (`codigo`, `codEditora`, `titulo`, `resumo`, `autores`) com construtor padrão | `src/app/livro.ts` |
| `ControleEditoraService` com vetor `editoras`, `getEditoras()` e `getNomeEditora()` usando `filter` | `src/app/controle-editora.service.ts` |
| `ControleLivrosService` com vetor `livros`, `obterLivros()`, `incluir()` (maior código + 1) e `excluir()` usando `findIndex`/`splice` | `src/app/controle-livros.service.ts` |
| Serviços no vetor `providers` | `src/app/app.module.ts` |
| Bootstrap via CDN e título "Catálogo de Livros" | `src/index.html` |
| `LivroListaComponent` com `editoras`, `livros`, `servEditora`, `servLivros`, `ngOnInit`, `excluir` e `obterNome` (arrow functions) | `src/app/livro-lista/livro-lista.component.ts` |
| Tabela com `*ngFor`, botão Excluir, editora e lista de autores | `src/app/livro-lista/livro-lista.component.html` |

### 2º Procedimento: cadastro e navegação

| Item | Arquivo |
| --- | --- |
| `FormsModule` no vetor `imports` | `src/app/app.module.ts` |
| Rotas `lista`, `dados` e redirecionamento de `''` para `/lista` | `src/app/app-routing.module.ts` |
| Menu `nav` com `routerLink` e `<router-outlet>` | `src/app/app.component.html` |
| `LivroDadosComponent` com `livro`, `autoresForm`, `editoras`, `servEditora`, `servLivros`, `router`, `ngOnInit` e `incluir` (arrow function) | `src/app/livro-dados/livro-dados.component.ts` |
| Formulário com `ngNativeValidate`, `[(ngModel)]`, `name` em todos os campos e `select` de editoras com `[ngValue]` | `src/app/livro-dados/livro-dados.component.html` |

## Roteiro de testes manuais

1. Abrir http://localhost:4200/ e confirmar o redirecionamento para `/lista` com 3 livros.
2. Clicar em **Excluir** em um livro e conferir que ele some da tabela.
3. Clicar em **Novo** no menu e tentar enviar o formulário vazio: o navegador bloqueia por falta de título.
4. Preencher só o título e enviar: o navegador bloqueia por falta de editora.
5. Preencher título, resumo, editora e autores (um por linha) e clicar em **Incluir**: volta para a lista com o novo livro, o nome da editora e os autores em lista.

> Os dados ficam em memória: ao recarregar a página, a lista volta aos 3 livros iniciais.
