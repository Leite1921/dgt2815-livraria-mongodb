import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo);
      controleLivro.excluir(codigo);
      res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (e) {
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};
