// src/lib/auth.ts
// Simulação de autenticação — apenas para demonstração.
// Em um projeto real, use algo como NextAuth.js ou JWT.

import { NextRequest } from "next/server";

interface UserSession {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Session {
  user: UserSession;
  expires: string;
}

// Autenticação no lado do cliente (usando localStorage)
export async function getAuthSession(): Promise<Session | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const mockAuthToken = localStorage.getItem("mockAuthToken");

  if (mockAuthToken) {
    try {
      const user = JSON.parse(mockAuthToken) as UserSession;
      return {
        user,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24h
      };
    } catch (e) {
      console.error("Erro ao analisar mockAuthToken do localStorage:", e);
      localStorage.removeItem("mockAuthToken");
      return null;
    }
  }

  return null;
}

// Autenticação no lado do servidor (para rotas API)
export async function getServerAuthSession(req: Request | NextRequest): Promise<Session | null> {
  const authorizationHeader = req.headers.get("authorization");
  console.log("getServerAuthSession: Authorization header:", authorizationHeader);

  if (!authorizationHeader) {
    console.log("getServerAuthSession: Nenhum cabeçalho de autorização, retornando null.");
    return null;
  }

  const token = authorizationHeader.split(" ")[1]; // Formato: "Bearer TOKEN"
  console.log("getServerAuthSession: Token extraído:", token);

  if (!token) {
    console.log("getServerAuthSession: Nenhum token encontrado, retornando null.");
    return null;
  }

  try {
    const user = JSON.parse(token) as UserSession;
    console.log("getServerAuthSession: Usuário autenticado:", user);

    return {
      user,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24h
    };
  } catch (e) {
    console.error("Erro ao analisar token do cabeçalho Authorization:", e);
    return null;
  }
}
