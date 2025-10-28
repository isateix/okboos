import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { nomeEmpresa, telefone, tipoComercial } = await request.json();

    // Validação básica
    if (!nomeEmpresa || !telefone) {
      return NextResponse.json({ error: "Por favor, preencha todos os campos obrigatórios." }, { status: 400 });
    }

    // Criar fornecedor
    const fornecedor = await prisma.fornecedor.create({
      data: {
        nomeEmpresa,
        telefone,
        tipoComercial: tipoComercial || null,
      },
    });

    return NextResponse.json({ message: "Fornecedor cadastrado com sucesso!", fornecedor }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    return NextResponse.json({ error: "Erro no servidor ao cadastrar fornecedor." }, { status: 500 });
  }
}
