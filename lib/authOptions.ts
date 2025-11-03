import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username === "Isabel" && credentials?.password === "12345") {
          return { id: "1", name: "Isabel", email: "isabel@example.com" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      // Quando o usuário loga, adiciona o id ao token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // Adiciona o id do token à sessão
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
};
