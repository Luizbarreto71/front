import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  is_paid: boolean;
  name?:string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function register(email: string, password: string) {
    const res = await fetch("https://mindkids-backendd.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Erro ao registrar");

    const data = await res.json();
    saveAuth(data.token, data.user);
    return true;
  }

  async function login(email: string, password: string) {
    const res = await fetch("https://mindkids-backendd.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Erro ao fazer login");

    const data = await res.json();
    saveAuth(data.token, data.user);
    return true;
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function saveAuth(token: string, user: User) {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return {
    user,
    token,
    login,
    register,
    logout,
  };
}



