import React from 'react';
import { IncidentAnalysis } from '../types';
import RiskBadge from './RiskBadge';
import ActionPlan from './ActionPlan';
import DocumentPreview from './DocumentPreview';
import LegalReference from './LegalReference';
import { ClipboardList, ShieldCheck } from 'lucide-react';

interface AnalysisViewProps {
  data: IncidentAnalysis;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Resumen Ejecutivo Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800">Dictamen Preliminar</h2>
          </div>
          <RiskBadge level={data.riskLevel} />
        </div>
        
        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clasificación del Hecho</span>
              <p className="text-2xl font-bold text-slate-800 mt-1">{data.classification}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Análisis Técnico</span>
              <p className="text-slate-600 mt-1 leading-relaxed text-sm md:text-base">{data.summary}</p>
            </div>
          </div>
          
          <div className="md:col-span-1">
             <LegalReference basis={data.legalBasis} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda: Plan de Acción */}
        <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800 ml-1 flex items-center">
                <ClipboardList className="w-5 h-5 mr-2 text-blue-600" />
                Protocolo de Actuación
            </h3>
            <ActionPlan actions={data.actions} />
        </div>

        {/* Columna Derecha: Documentos */}
        <div className="space-y-2">
             <h3 className="text-lg font-bold text-slate-800 ml-1 flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                Documentación Requerida
            </h3>
            <DocumentPreview documents={data.documents} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;