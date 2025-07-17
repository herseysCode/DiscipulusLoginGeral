'use client';
import { useUsuario } from '@/app/context/UsuarioContext';
import Cabecalho from './Cabecalho';

export default function CabecalhoClient() {
  const { usuario, lidarComLogout, carregando } = useUsuario();

  // Mostrar loading enquanto verifica se há usuário salvo
  if (carregando) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/BrancoComFundoPreto.jpg" 
                alt="Discipulus" 
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-gray-900">Discipulus</span>
            </div>
            <div className="animate-pulse">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

  return <Cabecalho usuario={usuario} aoFazerLogout={lidarComLogout} />;