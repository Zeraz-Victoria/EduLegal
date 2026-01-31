import React, { useState } from 'react';
import Layout from './components/Layout';
import IncidentForm from './components/IncidentForm';
import AnalysisView from './components/AnalysisView';
import { IncidentAnalysis, AnalysisState, IncidentContext } from './types';
import { analyzeIncident } from './services/geminiService';
import { ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleAnalyze = async (context: IncidentContext) => {
    setState({ isLoading: true, error: null, data: null });
    try {
      const result = await analyzeIncident(context);
      setState({ isLoading: false, error: null, data: result });
    } catch (err: any) {
      setState({
        isLoading: false,
        error: "Error al procesar el protocolo. Por favor intente nuevamente con más detalles.",
        data: null
      });
    }
  };

  const resetAnalysis = () => {
    setState({ isLoading: false, error: null, data: null });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        
        {/* Header dinamico */}
        <div className="mb-6 flex justify-between items-end">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Gestión de Incidentes</h1>
                <p className="text-slate-500 mt-1">Asistente normativo basado en la Ley 303 y Protocolos SEV.</p>
            </div>
            {state.data && (
                <button 
                    onClick={resetAnalysis}
                    className="hidden md:flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Nuevo Reporte
                </button>
            )}
        </div>

        {state.error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm shadow-sm flex items-center">
              <span className="font-bold mr-2">Error:</span> {state.error}
            </div>
        )}

        {/* Contenido Principal */}
        {!state.data ? (
            <div className="animate-fade-in-up">
                <IncidentForm onSubmit={handleAnalyze} isLoading={state.isLoading} />
                
                {/* Empty State / Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-3"></div>
                        <h4 className="font-bold text-slate-700 text-sm">Análisis Contextual</h4>
                        <p className="text-xs text-slate-500 mt-1">Detecta riesgos según ubicación y rol.</p>
                    </div>
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-3"></div>
                        <h4 className="font-bold text-slate-700 text-sm">Documentación Legal</h4>
                        <p className="text-xs text-slate-500 mt-1">Redacción automática de actas.</p>
                    </div>
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-3"></div>
                        <h4 className="font-bold text-slate-700 text-sm">Protocolos SEV</h4>
                        <p className="text-xs text-slate-500 mt-1">Alineado a normativa vigente.</p>
                    </div>
                </div>
            </div>
        ) : (
            <>
                <div className="block md:hidden mb-4">
                    <button 
                        onClick={resetAnalysis}
                        className="flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al inicio
                    </button>
                </div>
                <AnalysisView data={state.data} />
            </>
        )}
      </div>
    </Layout>
  );
};

export default App;