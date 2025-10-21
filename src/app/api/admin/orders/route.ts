// src/app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getServerAuthSession } from "src/lib/auth";
import type { Prisma, OrderStatus } from "@prisma/client"; // ✅ tudo aqui

export async function GET(req: Request) {
  const session = await getServerAuthSession(req);
  console.log("API Admin Orders: Session object:", session);

  if (!session || !session.user || !session.user.isAdmin) {
    console.log("API Admin Orders: Authorization failed. isAdmin:", session?.user?.isAdmin);
    return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");

    // ✅ Tipagem oficial do Prisma
    let whereClause: Prisma.OrderWhereInput = {};

    if (statusParam) {
      const statuses = statusParam.split(",").map((s) => s.trim().toUpperCase());
      whereClause = { status: { in: statuses as OrderStatus[] } }; // ✅ tipo correto
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return NextResponse.json({ message: "Erro ao buscar todos os pedidos" }, { status: 500 });
  }
}
