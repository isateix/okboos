"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: (clearCart?: () => void) => void; // ✅ Passa clearCart opcional
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("mockAuthToken");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("mockAuthToken", JSON.stringify(userData));
  };

  const logout = (clearCart?: () => void) => {
    setUser(null);
    localStorage.removeItem("mockAuthToken");
    if (clearCart) clearCart();
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
