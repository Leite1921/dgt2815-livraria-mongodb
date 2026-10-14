import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/ControleEditora';

export const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      res.status(200).json(controleEditora.getEditoras());
    } else {
      res.status(405).end();
    }
  } catch (e) {
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};
