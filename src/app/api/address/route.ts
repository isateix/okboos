import { NextResponse } from "next/server";
import { getServerAuthSession } from "../../../lib/auth";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  // getServerAuthSession aceita Request/NextRequest e usa o header Authorization
  const session = await getServerAuthSession(req);

  if (!session?.user) {
    return NextResponse.json({ error: "Usuário não logado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { street, city, state, zip, country } = body;

    if (!street || !city || !state || !zip || !country) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

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

    return NextResponse.json({ address }, { status: 201 });
  } catch (err) {
    console.error("address POST error:", err);
    return NextResponse.json({ error: "Erro ao salvar endereço" }, { status: 500 });
  }
}
