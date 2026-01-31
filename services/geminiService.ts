import { GoogleGenAI, Type, Schema } from "@google/genai";
import { IncidentAnalysis, IncidentContext } from "../types";

// Define the expected JSON schema for the model output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "Clasificación del incidente (Acoso, Maltrato, Sexual, Falta Reglamento)",
    },
    riskLevel: {
      type: Type.STRING,
      enum: ["Bajo", "Medio", "Alto/Crítico"],
      description: "Nivel de riesgo determinado según protocolos.",
    },
    summary: {
      type: Type.STRING,
      description: "Breve resumen técnico-jurídico del incidente.",
    },
    legalBasis: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista explícita de Artículos, Protocolos (SEV) o Leyes que fundamentan la acción.",
    },
    actions: {
      type: Type.OBJECT,
      properties: {
        director: { type: Type.ARRAY, items: { type: Type.STRING } },
        docente: { type: Type.ARRAY, items: { type: Type.STRING } },
        padres: { type: Type.ARRAY, items: { type: Type.STRING } },
        alumno: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["director", "docente", "padres", "alumno"],
    },
    documents: {
      type: Type.OBJECT,
      properties: {
        actaHechos: { type: Type.STRING, description: "Texto completo del Acta de Hechos. DEBE incluir quién reporta y ubicación." },
        citatorio: { type: Type.STRING, description: "Texto completo del Citatorio." },
        oficioCanalizacion: { type: Type.STRING, description: "Texto completo del Oficio de Canalización (si aplica) o N/A." },
      },
      required: ["actaHechos", "citatorio", "oficioCanalizacion"],
    },
  },
  required: ["classification", "riskLevel", "summary", "legalBasis", "actions", "documents"],
};

export const analyzeIncident = async (context: IncidentContext): Promise<IncidentAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key no encontrada en el entorno.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    Eres un Abogado Experto en Normativa Educativa del Estado de Veracruz, México. 
    Tu especialidad son los Protocolos de Actuación para la Identificación, Prevención e Intervención en el Acoso Escolar, Maltrato Infantil y Actos de Connotación Sexual de la SEV.

    BASES LEGALES OBLIGATORIAS:
    1. Ley 303 para la Prevención del Acoso Escolar (Veracruz).
    2. Ley 573 de los Derechos de Niñas, Niños y Adolescentes (Veracruz).
    3. Ley General de Educación.
    4. Protocolos de la SEV y Manuales de Convivencia Escolar vigentes.

    INSTRUCCIONES DE CONTEXTO:
    - Analiza el incidente considerando la ubicación (Ej: si fue en baño, revisar protocolos de guardia/vigilancia).
    - Considera quién reporta (Ej: si reporta un alumno, activar escucha activa y protección inmediata).
    
    REGLAS PARA DOCUMENTOS:
    1. ACTA DE HECHOS: Debe ser formal. Incluir explícitamente: "Quien reporta: ${context.role}", "Lugar de los hechos: ${context.location}".
    2. CITATORIO: Tono administrativo pero respetuoso.
    3. CANALIZACIÓN: Solo si es riesgo Alto o delito.

    ESTILO: Formal, Jurídico-Administrativo, pero claro para directivos.
  `;

  try {
    const prompt = `
      CONTEXTO DEL INCIDENTE:
      - Quien reporta: ${context.role}
      - Ubicación del incidente: ${context.location}
      - Descripción de los hechos: ${context.description}

      Genera el análisis, clasificación de riesgo, fundamentos legales específicos y documentos.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as IncidentAnalysis;
    } else {
      throw new Error("La respuesta del modelo está vacía.");
    }
  } catch (error) {
    console.error("Error analizando el incidente:", error);
    throw error;
  }
};