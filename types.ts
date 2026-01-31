export enum RiskLevel {
  BAJO = 'Bajo',
  MEDIO = 'Medio',
  ALTO = 'Alto/Crítico'
}

export type ReportingRole = 'Director' | 'Docente' | 'Prefecto' | 'Personal de Apoyo' | 'Padre de Familia' | 'Alumno';

export type IncidentLocation = 'Aula' | 'Patio/Cancha' | 'Baños' | 'Entrada/Salida' | 'Pasillos' | 'Fuera del Plantel' | 'Redes Sociales';

export interface ActionGuide {
  director: string[];
  docente: string[];
  padres: string[];
  alumno: string[];
}

export interface GeneratedDocuments {
  actaHechos: string;
  citatorio: string;
  oficioCanalizacion: string;
}

export interface IncidentAnalysis {
  classification: string;
  riskLevel: RiskLevel;
  summary: string;
  legalBasis: string[]; // Citas a Ley 303, Protocolos SEV, etc.
  actions: ActionGuide;
  documents: GeneratedDocuments;
}

export interface IncidentContext {
  role: ReportingRole;
  location: IncidentLocation;
  description: string;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  data: IncidentAnalysis | null;
}