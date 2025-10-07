import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    // 1. Procurar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Email ou senha incorretos!" }, { status: 400 });
    }

    // 2. Comparar senha digitada com a senha hashada no banco
    const isValid = await bcrypt.compare(senha, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Email ou senha incorretos!" }, { status: 400 });
    }

    // 3. Se tudo certo → retorna sucesso
    return NextResponse.json({ message: "Login realizado com sucesso!", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no servidor." }, { status: 500 });
  }
}
