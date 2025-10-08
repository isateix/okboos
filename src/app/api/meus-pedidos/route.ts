import { NextResponse } from "next/server";
import { getServerAuthSession } from 'src/lib/auth'; // Corrected path
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  console.log("API meus-pedidos: Request headers:", req.headers);
  const session = await getServerAuthSession(req as any); // Cast req to any for now
  console.log("API meus-pedidos: Session object:", session);

  if (!session || !session.user) {
    console.log("Não autenticado na API de meus-pedidos");
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    // 1️⃣ Pegar o userId vindo pela query string (ex: /api/meus-pedidos?userId=123)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // 2️⃣ Verificar se veio o userId
    if (!userId) {
      console.error("❌ userId não enviado na requisição.");
      return NextResponse.json({ message: "Usuário não autenticado." }, { status: 401 });
    }

    console.log("📦 Buscando pedidos do usuário:", userId);

    // 3️⃣ Buscar os pedidos desse usuário
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true, // se tiver relação com itens do pedido
        shippingAddress: true, // se existir
      },
      orderBy: { createdAt: "desc" },
    });

    // 4️⃣ Retornar os pedidos
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("🔥 Erro ao buscar pedidos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar pedidos do usuário." },
      { status: 500 }
    );
  }
}
