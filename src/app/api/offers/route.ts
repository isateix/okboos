// src/app/api/offers/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerAuthSession } from 'src/lib/auth';

export async function GET() {
  // GET request for offers does not require authentication
  // ...
}

export async function POST(req: Request) {
  const session = await getServerAuthSession(req as any);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  try {
    const { title, description, price, imageUrl, startDate, endDate } = await req.json();

    if (!title || !description || !price || !startDate || !endDate) {
      return NextResponse.json({ message: 'Todos os campos obrigatórios devem ser preenchidos' }, { status: 400 });
    }

    const newOffer = await prisma.offer.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json({ message: 'Erro ao criar oferta' }, { status: 500 });
  }
}
