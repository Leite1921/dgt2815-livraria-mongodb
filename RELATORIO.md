# Relatório de execução autônoma — DGT2815

Data: 14/10/2026. Trabalho executado em modo autônomo; abaixo, o que foi feito, as decisões tomadas onde o enunciado era ambíguo, os bloqueios e o que ainda depende de você.

## Resumo

| Etapa | Status |
|-------|--------|
| MongoDB 9.0.4 instalado (brew) e rodando; banco `livraria` / coleção `livros` | ✅ |
| `livros-react` e `livros-next` **recriados do zero** (versão "original", com vetor local / API interna) | ✅ commit `a735634` |
| 1º procedimento: `livro-servidor` (Express + Mongoose + cors, porta 3030) | ✅ commit `ab79d09` |
| Testes do servidor com curl + conferência no `mongosh` | ✅ |
| 2º procedimento: cópias em `clientes/` adaptadas | ✅ commit "2º procedimento: clientes integrados ao servidor" |
| Build dos três clientes (`npm run build` / `ng build`) | ✅ |
| Teste no navegador (Chrome headless) de listar / incluir / excluir nos três | ✅ |

## ⚠️ Projetos recriados

**`livros-react` e `livros-next` não existiam na máquina e foram recriados do zero** a partir do enunciado e do `livros-angular` existente (mesmos 3 livros e 3 editoras, mesmo layout Bootstrap). O commit `a735634` guarda a versão "original" (antes da Parte B), para o histórico mostrar o antes e o depois:

- **livros-react**: create-react-app com template TypeScript (funcionou no Node 24, não foi preciso usar Vite). `react-router-dom` com `/` (lista) e `/dados` (cadastro), `useNavigate`, Bootstrap via CDN em `public/index.html`. `LinhaLivro` fica dentro de `LivroLista.js`.
- **livros-next**: Next 16.4.1, Pages Router, TypeScript. Classes em `classes/`, componentes `Menu` e `LinhaLivro` em `componentes/`, Bootstrap via CDN em `pages/_document.tsx`. A versão original usa API interna (`pages/api/livros`, `pages/api/editoras`) e páginas com `baseURL = 'http://localhost:3000/api/livros'` e funções assíncronas de fetch.

O `livros-angular` original está intacto, com o repositório git próprio. Por isso ele foi colocado no `.gitignore` do repositório raiz, para não virar um submódulo acidental.

## Decisões tomadas

1. **`_id` no schema → opção (b)**: `_id: { type: banco.Schema.Types.ObjectId, default: () => new banco.Types.ObjectId() }`. Mantém o `_id` declarado como no enunciado e permite POST sem `_id`. Além disso, a rota POST remove `_id` vazio, nulo ou ausente antes de chamar `incluir` (testado com os três casos).
2. **Mongoose fixado na série 8 (`^8.24.5`)**. O `npm install mongoose` instalou a 9.x, cujo driver MongoDB 7 **rejeita** `useUnifiedTopology`/`useNewUrlParser` (`options useunifiedtopology, usenewurlparser are not supported`), e a conexão falhava. Como o enunciado exige o `options` exatamente assim, a solução foi usar o Mongoose 8, em que essas opções geram só um aviso de obsolescência no console. Continua sendo apenas a biblioteca mongoose.
3. **DELETE com `_id` inválido** → responde 500 `{ ok: false, mensagem: 'Falha ao excluir livro' }` sem derrubar o servidor (testado com `/livros/abc`). O GET também tem `try/catch`.
4. **`obterLivros` x `obterTodos`**: React e Next usam `obterLivros` no controlador e `obterTodos` como sinônimo que delega para ele; os componentes chamam `obterTodos`. No **Angular**, mantive `obterLivros`, que é o nome que já existia e é chamado pelos componentes (o enunciado fala em `obterTodos`, mas o projeto nunca teve esse método).
5. **Mapeamento `_id` → `codigo`**: `new Livro(livro._id ?? '', ...)`. O `?? ''` só existe para satisfazer o tipo `String | null` da interface `LivroMongo`.
6. **Next: `pages/api/livros/` foi apagada** (você pediu para perguntar antes, mas depois autorizou decidir sozinho). Ela deixou de compilar, porque usava o controlador antigo, e ficou sem uso. **`pages/api/editoras/` foi mantida**, porque continua válida e não atrapalha.
7. **Next: `excluir(codigo: String)`** na página; `LinhaLivro` recebe `excluir` como callback sem parâmetros (como no original).
8. **MongoDB pelo brew**: o Homebrew atual recusa fórmulas de taps não confiáveis. Liberei apenas as fórmulas necessárias (`brew trust --formula` para `mongodb-community`, `mongodb-database-tools` e `mongodb-enterprise`, esta última lida só como conflito declarado), não o tap inteiro. Como efeito colateral, o brew atualizou algumas dependências, entre elas o `node` do Homebrew (26.x). **O Node em uso continua o 24.14.1 do mise**, que vem antes no PATH. Antes disso, tentei o Docker: o Docker Desktop não subiu.
9. **Repositório git na raiz `estacio`**, com `.gitignore` para `node_modules`, `dist`, `.angular`, `.next`, `build`, `*.log`, `livros-angular/` e `Trabalho_DGT2820/` (este último não tem relação com o trabalho).
10. **Carga inicial do banco**: os mesmos 3 livros dos projetos (Código Limpo, Engenharia de Software, Padrões de Projeto), com `codEditora` de 1 a 3.
11. **Telas renderizadas em headless** e salvas em `evidencias/` (lista, formulário, após incluir, após excluir, para cada cliente), apenas como referência. Os prints oficiais você tira manualmente (abaixo).

## Resultados dos testes

Servidor (curl): GET inicial `[]` → 3 POST + 1 POST de teste, todos `{"ok":true,...}` → DELETE do livro de teste `{"ok":true,...}` → DELETE `/livros/abc` → HTTP 500 com `ok:false` → `mongosh`: 3 documentos.

Navegador (Chrome headless controlado pelo DevTools Protocol):

```
[react]   lista inicial: Código Limpo, Engenharia de Software, Padrões de Projeto
[react]   após incluir -> URL /           | na tela: true  | no banco: true
[react]   após excluir ->                 | na tela: false | no banco: false
[next]    após incluir -> URL /LivroLista | na tela: true  | no banco: true
[next]    após excluir ->                 | na tela: false | no banco: false
[angular] após incluir -> URL /lista      | na tela: true  | no banco: true
[angular] após excluir ->                 | na tela: false | no banco: false
```

Estado final do banco: 3 livros (carga inicial).

## Roteiro de prints para a entrega

1. **MongoDB Compass**: conectar em `mongodb://127.0.0.1:27017` → `livraria` → `livros`, mostrando os 3 documentos.
2. **Postman/curl**: com `cd livro-servidor && npm start`, print do GET `http://localhost:3030/livros`, de um POST com JSON e da resposta `{"ok":true,...}`, e de um DELETE.
3. **React** (`cd clientes/livros-react && npm start`): print da lista; incluir um livro em "Novo" e tirar print da lista com o livro novo; excluir e tirar print. Encerrar com Ctrl+C.
4. **Next** (`cd clientes/livros-next && npm run dev`, com o React parado): mesmo roteiro em `/LivroLista` e `/LivroDados`.
5. **Angular** (`cd clientes/livros-angular && npx ng serve`): mesmo roteiro em `http://localhost:4200`.
6. Opcional: atualizar o Compass após incluir e excluir, para mostrar a coleção mudando.

## Pendências / bloqueios

- Nenhum bloqueio em aberto.
- O MongoDB ficou como serviço do brew e inicia junto com o login. Para desligar: `brew services stop mongodb-community`.
- Todos os processos em background (servidor, dev servers e Chrome headless) foram encerrados.
