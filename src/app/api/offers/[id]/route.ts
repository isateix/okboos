// src/app/api/offers/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getServerAuthSession } from 'src/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const offerId = parseInt(params.id, 10);
  if (isNaN(offerId)) {
    return NextResponse.json({ message: 'ID da oferta inválido' }, { status: 400 });
  }

  try {
    const { title, description, price, imageUrl, startDate, endDate, active } = await req.json();

    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        title: title || undefined,
        description: description || undefined,
        price: price ? parseFloat(price) : undefined,
        imageUrl: imageUrl || undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        active: active !== undefined ? active : undefined,
      },
    });

    return NextResponse.json(updatedOffer, { status: 200 });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json({ message: 'Erro ao atualizar oferta' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  const offerId = parseInt(params.id, 10);
  if (isNaN(offerId)) {
    return NextResponse.json({ message: 'ID da oferta inválido' }, { status: 400 });
  }

  try {
    await prisma.offer.delete({
      where: { id: offerId },
    });
    return NextResponse.json({ message: 'Oferta excluída com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json({ message: 'Erro ao excluir oferta' }, { status: 500 });
  }
}
