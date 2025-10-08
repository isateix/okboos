"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getAuthSession } from "../lib/auth";

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getAuthSession();
        if (session && session.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error fetching auth session:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockAuthToken');
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
 
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
