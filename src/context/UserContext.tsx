"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getAuthSession } from "../lib/auth";
import { useCart } from "./CartContext"; // Import useCart

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
  const { clearCart } = useCart(); // Access clearCart from CartContext

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const mockAuthToken = localStorage.getItem('mockAuthToken');
        if (mockAuthToken) {
          const parsedUser: User = JSON.parse(mockAuthToken);
          setUser(parsedUser);
          console.log("UserContext: User loaded from localStorage", parsedUser);
          console.log("UserContext: isAdmin status from localStorage", parsedUser.isAdmin);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing mockAuthToken from localStorage:", error);
        localStorage.removeItem('mockAuthToken'); // Clear invalid token
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Listen for changes to localStorage (e.g., from login/logout in other tabs)
    const handleStorageChange = () => {
      loadUserFromLocalStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    loadUserFromLocalStorage(); // Initial load

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // The localStorage.setItem is handled in login/page.tsx
    // This useEffect will pick up the change via the 'storage' event listener
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockAuthToken');
    }
    clearCart(); // Clear the cart on logout
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
