import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return NextResponse.json({ success: false, error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "okbossgeral@gmail.com",
        pass: process.env.GMAIL_PASS, // senha de app
      },
    });

    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: "okbossgeral@gmail.com",
      subject: "Nova mensagem do formulário de contacto",
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ success: false, error: "Erro ao enviar o email." }, { status: 500 });
  }
}
