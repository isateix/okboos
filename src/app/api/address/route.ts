// okboos/src/app/api/address/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Usuário não logado" }, { status: 401 });
  }

  const body = await req.json();
  const { street, city, state, zip, country } = body;

  if (!street || !city || !state || !zip || !country) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
  }

  try {
    const address = await prisma.address.create({
      data: {
        userId: Number(session.user.id), // ⚡ importante converter para número
        street,
        city,
        state,
        zip,
        country,
      },
    });

    return NextResponse.json({ address }, { status: 201 });
  } catch (err) {
    console.error("Erro ao criar endereço:", err);
    return NextResponse.json({ error: "Erro ao salvar endereço" }, { status: 500 });
  }
}
