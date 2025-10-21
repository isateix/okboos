import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { getServerAuthSession } from "../../../../../../lib/auth";

interface DeliveryDetails {
  address?: string;
  estimatedDate?: string;
  [key: string]: unknown; // permite campos extras sem usar `any`
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerAuthSession(req);

  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { message: "Não autorizado" },
      { status: 403 }
    );
  }

  const orderId = parseInt(params.id, 10);
  if (isNaN(orderId)) {
    return NextResponse.json(
      { message: "ID do pedido inválido" },
      { status: 400 }
    );
  }

  // Tipagem segura para o corpo da requisição
  const body: { deliveryDetails?: DeliveryDetails } = await req.json();
  const deliveryDetails = body.deliveryDetails || null;

  console.log("API Approve Order: orderId:", orderId);
  console.log("API Approve Order: deliveryDetails:", deliveryDetails);

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "APPROVED",
        // ✅ CORREÇÃO: converte o objeto em string JSON antes de salvar
        estimatedDelivery: deliveryDetails
          ? JSON.stringify(deliveryDetails)
          : null,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
        shippingAddress: true,
      },
    });

    console.log(
      "API Approve Order: Prisma update successful. Updated order:",
      updatedOrder.id
    );
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error approving order:", error);
    return NextResponse.json(
      { message: "Erro ao aprovar pedido" },
      { status: 500 }
    );
  }
}
