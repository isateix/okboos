import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const { nome, email, telefone, assunto, mensagem } = data;

    // Configuração do transporte do NodeMailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "isateix1996@gmail.com", // seu e-mail
        pass: process.env.EMAIL_APP_PASSWORD, // senha de app (explicação abaixo)
      },
    });

    // Enviar e-mail
    await transporter.sendMail({
      from: email, // o cliente que enviou
      to: "isateix1996@gmail.com", // você recebe a mensagem
      subject: `Mensagem do site: ${assunto || "Sem assunto"}`,
      text: `Nome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });

    return new Response(JSON.stringify({ message: "Mensagem enviada com sucesso!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erro ao enviar mensagem" }), {
      status: 500,
    });
  }
}
