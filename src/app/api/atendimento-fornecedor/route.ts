import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { empresa, email, motivo, mensagem } = await req.json();

    if (!empresa || !email || !motivo || !mensagem) {
      return NextResponse.json({ success: false, error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "okbossgeral@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${empresa}" <${email}>`,
      to: "okbossgeral@gmail.com",
      subject: `Atendimento do Fornecedor - ${motivo}`,
      text: `Empresa: ${empresa}\nEmail: ${email}\nMotivo: ${motivo}\nMensagem: ${mensagem}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email do fornecedor:", error);
    return NextResponse.json({ success: false, error: "Erro ao enviar o email do fornecedor." }, { status: 500 });
  }
}
