// src/lib/auth.ts
// This is a mock authentication utility for demonstration purposes.
// In a real application, this would integrate with a proper authentication system (e.g., NextAuth.js).

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

export async function getAuthSession(): Promise<Session | null> {
  // For demonstration, return a mock admin user session.
  // In a real app, you would fetch the actual session from your auth provider.
  return {
    user: {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      isAdmin: true,
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Expires in 24 hours
  };
}
