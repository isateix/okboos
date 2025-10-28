import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { nomeEmpresa, telefone, tipoComercial } = await req.json();

    if (!nomeEmpresa || !telefone) {
      return NextResponse.json(
        { success: false, error: "Nome da empresa e telefone são obrigatórios." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "okbossgeral@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fornecedor: ${nomeEmpresa}" <okbossgeral@gmail.com>`,
      to: "okbossgeral@gmail.com",
      subject: "Novo cadastro de fornecedor",
      text: `📦 Novo Fornecedor Cadastrado

Empresa: ${nomeEmpresa}
Telefone: +244 ${telefone}
Tipo Comercial: ${tipoComercial || "Não informado"}
`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email do fornecedor:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
