import React, { useState } from 'react';
import { ActionGuide } from '../types';
import { User, Users, GraduationCap, School } from 'lucide-react';

interface ActionPlanProps {
  actions: ActionGuide;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ actions }) => {
  const [activeTab, setActiveTab] = useState<'director' | 'docente' | 'padres' | 'alumno'>('director');

  const tabs = [
    { id: 'director', label: 'Director/a', icon: School },
    { id: 'docente', label: 'Docente', icon: GraduationCap },
    { id: 'padres', label: 'Padres/Tutores', icon: Users },
    { id: 'alumno', label: 'Alumno/a', icon: User },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Ruta de Actuación por Rol</h3>
      </div>
      
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-4 px-4 text-sm font-medium transition-colors border-b-2 ${
                isActive
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 min-h-[300px]">
        <ul className="space-y-4">
          {actions[activeTab].map((step, idx) => (
            <li key={idx} className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-sm font-bold mr-4">
                {idx + 1}
              </span>
              <p className="text-slate-700 mt-1 leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActionPlan;
