import React from 'react';
import { Scale, BookOpen, ShieldAlert } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-900 p-2 rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">SEV Protocol Manager</h1>
              <p className="text-xs text-slate-500 font-medium">Sistema de Gestión de Incidentes - Veracruz</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="hidden md:flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>Ley 303</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <ShieldAlert className="h-4 w-4" />
              <span>Protocolos Vigentes</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2024 Gobierno del Estado de Veracruz - Secretaría de Educación.</p>
          <p className="mt-1 text-slate-500">Herramienta de apoyo basada en IA. Siempre consultar con el área jurídica de la supervisión.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
