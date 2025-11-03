import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getSession() {
  try {
    if (typeof window !== "undefined") return null;
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
}
