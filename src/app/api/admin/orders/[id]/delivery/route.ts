import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { getServerAuthSession } from "../../../../../../lib/auth";

// Tipagem segura para detalhes de entrega
interface EstimatedDelivery {
  address?: string;
  estimatedDate?: string;
  [key: string]: unknown; // permite campos extras sem usar 'any'
}

// Tipagem do corpo da requisição
interface DeliveryRequestBody {
  estimatedDelivery?: EstimatedDelivery;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Autenticação
  const session = await getServerAuthSession(req);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
  }

  // Validar ID do pedido
  const orderId = parseInt(params.id, 10);
  if (isNaN(orderId)) {
    return NextResponse.json({ message: "ID do pedido inválido" }, { status: 400 });
  }

  // Ler corpo da requisição com tipagem segura
  const body: DeliveryRequestBody = await req.json();
  const estimatedDelivery = body.estimatedDelivery || null;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { 
        // ✅ converte o objeto para JSON string antes de salvar
        estimatedDelivery: estimatedDelivery ? JSON.stringify(estimatedDelivery) : null 
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating delivery details:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar detalhes de entrega" },
      { status: 500 }
    );
  }
}
