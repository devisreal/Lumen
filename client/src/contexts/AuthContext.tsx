/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";

import { getCurrentUser } from "../api/auth";
import { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCurrentUser();
        console.log(data);

        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
