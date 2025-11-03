// pages/api/address.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/session"; // ajuste conforme seu getSession
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req);

  if (!session?.user) {
    return res.status(401).json({ error: "Usuário não logado" });
  }

  if (req.method === "POST") {
    const { street, city, state, zip, country } = req.body;

    if (!street || !city || !state || !zip || !country) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      const address = await prisma.address.create({
        data: {
          userId: session.user.id,
          street,
          city,
          state,
          zip,
          country,
        },
      });

      return res.status(201).json({ address });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar endereço" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
