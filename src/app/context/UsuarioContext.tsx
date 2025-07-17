"use client";

import { Usuario } from "@/model/usuario";
import { createContext, useContext, useState, useEffect } from "react";

interface UsuarioContextType {
  usuario: Usuario | null;
  lidarComLogin: (usuario: Usuario) => void;
  lidarComLogout: () => void;
  carregando: boolean;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Carregar usuário do localStorage quando o componente montar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('discipulus_usuario');
    if (usuarioSalvo) {
      try {
        const usuarioParsed = JSON.parse(usuarioSalvo);
        setUsuario(usuarioParsed);
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        localStorage.removeItem('discipulus_usuario');
      }
    }
    setCarregando(false);
  }, []);
  const lidarComLogin = (dadosUsuario: Usuario) => {
    setUsuario(dadosUsuario);
    // Salvar no localStorage
    localStorage.setItem('discipulus_usuario', JSON.stringify(dadosUsuario));
  };

  const lidarComLogout = () => {
    setUsuario(null);
    // Remover do localStorage
    localStorage.removeItem('discipulus_usuario');
  };

  return (
    <UsuarioContext.Provider value={{ usuario, lidarComLogin, lidarComLogout, carregando }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error("useUsuario must be used within a UsuarioProvider");
    }
    return context;
}