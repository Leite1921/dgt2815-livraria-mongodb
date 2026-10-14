import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const codEditora = Number(req.query.codEditora);
      res.status(200).json({ nome: controleEditora.getNomeEditora(codEditora) });
    } else {
      res.status(405).end();
    }
  } catch (e) {
    res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};
