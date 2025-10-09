import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // 🔒 Pegamos o header Authorization: "Bearer {id}"
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      console.log("⚠️ Nenhum cabeçalho de autorização encontrado");
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    // Extrai o conteúdo do Bearer
    const rawToken = authHeader.replace("Bearer ", "").trim();

    // Tenta converter o token em objeto (JSON)
    let user;
    try {
      user = JSON.parse(rawToken);
    } catch {
      console.log("⚠️ Token inválido, não é JSON válido");
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    if (!user?.id) {
      console.log("⚠️ ID do usuário ausente");
      return NextResponse.json({ message: "Usuário inválido" }, { status: 401 });
    }

    console.log("📦 Buscando pedidos do usuário ID:", user.id);

    // 🔎 Busca pedidos reais desse usuário
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: true,
        shippingAddress: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("🔥 Erro ao buscar pedidos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar pedidos do usuário." },
      { status: 500 }
    );
  }
}
