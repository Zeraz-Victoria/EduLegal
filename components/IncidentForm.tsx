import React, { useState } from 'react';
import { Send, FileText, Loader2, MapPin, UserCircle2 } from 'lucide-react';
import { IncidentContext, ReportingRole, IncidentLocation } from '../types';

interface IncidentFormProps {
  onSubmit: (data: IncidentContext) => void;
  isLoading: boolean;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');
  const [role, setRole] = useState<ReportingRole>('Docente');
  const [location, setLocation] = useState<IncidentLocation>('Aula');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit({ role, location, description });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-100 p-2.5 rounded-xl">
          <FileText className="h-6 w-6 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Nuevo Reporte</h2>
          <p className="text-sm text-slate-500">Ingrese los datos para iniciar el protocolo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selector de Rol */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
              <UserCircle2 className="w-4 h-4 mr-1.5 text-blue-600" />
              ¿Quién Reporta?
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as ReportingRole)}
                disabled={isLoading}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-8 transition-colors"
              >
                <option value="Director">Director/a</option>
                <option value="Docente">Docente</option>
                <option value="Prefecto">Prefecto/a</option>
                <option value="Personal de Apoyo">Personal de Apoyo</option>
                <option value="Padre de Familia">Padre de Familia</option>
                <option value="Alumno">Alumno/a</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Selector de Ubicación */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-red-500" />
              Ubicación del Incidente
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as IncidentLocation)}
                disabled={isLoading}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-8 transition-colors"
              >
                <option value="Aula">Aula de Clases</option>
                <option value="Patio/Cancha">Patio / Cancha</option>
                <option value="Baños">Baños</option>
                <option value="Pasillos">Pasillos</option>
                <option value="Entrada/Salida">Entrada / Salida</option>
                <option value="Fuera del Plantel">Fuera del Plantel</option>
                <option value="Redes Sociales">Redes Sociales / Internet</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Texto */}
        <div className="space-y-2">
           <label className="text-sm font-semibold text-slate-700">Narración de los Hechos</label>
          <textarea
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-slate-800 placeholder:text-slate-400 text-sm leading-relaxed"
            placeholder="Describa qué sucedió, alumnos involucrados y situación actual..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!description.trim() || isLoading}
            className={`flex items-center space-x-2 px-8 py-3.5 rounded-xl font-semibold transition-all shadow-md ${
              !description.trim() || isLoading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-blue-900/20 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Procesando Normativa...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Analizar Protocolo</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;