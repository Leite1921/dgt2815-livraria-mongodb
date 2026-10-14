import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/ControleLivros';

export const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      res.status(200).json(controleLivro.obterLivros());
    } else if (req.method === 'POST') {
      controleLivro.incluir(req.body);
      res.status(200).json({ mensagem: 'Livro incluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (e) {
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};
