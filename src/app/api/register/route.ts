// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, senha } = body;

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Campos inválidos" }, { status: 400 });
    }

    // checar se já existe email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
    }

    // hash da senha
    const hashed = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        name: nome,
        email,
        password: hashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("API /api/register error:", err);
    return NextResponse.json({ error: "Erro do servidor" }, { status: 500 });
  }
}
