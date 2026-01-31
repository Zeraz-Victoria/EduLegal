import React, { useState } from 'react';
import { GeneratedDocuments } from '../types';
import { Copy, Check, FileText } from 'lucide-react';

interface DocumentPreviewProps {
  documents: GeneratedDocuments;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ documents }) => {
  const [activeDoc, setActiveDoc] = useState<keyof GeneratedDocuments>('actaHechos');
  const [copied, setCopied] = useState(false);

  const docTypes: { key: keyof GeneratedDocuments; label: string }[] = [
    { key: 'actaHechos', label: 'Acta de Hechos' },
    { key: 'citatorio', label: 'Citatorio Padres' },
    { key: 'oficioCanalizacion', label: 'Canalización' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(documents[activeDoc]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-slate-500" />
            Documentación Legal
        </h3>
        <div className="flex space-x-2">
            {docTypes.map((type) => (
                <button
                    key={type.key}
                    onClick={() => setActiveDoc(type.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        activeDoc === type.key
                            ? 'bg-slate-800 text-white'
                            : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    {type.label}
                </button>
            ))}
        </div>
      </div>

      <div className="relative flex-grow bg-slate-100 p-4">
        <div className="absolute top-6 right-8 z-10">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 bg-white border border-slate-300 shadow-sm px-3 py-1.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
          </button>
        </div>
        
        <div className="bg-white shadow-sm border border-slate-200 p-8 h-[500px] overflow-y-auto rounded-lg font-serif text-slate-800 leading-relaxed whitespace-pre-wrap">
          {documents[activeDoc] === "N/A" || !documents[activeDoc] ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <FileText className="w-12 h-12 mb-2 opacity-20" />
                <p>Este documento no aplica para el caso actual.</p>
             </div>
          ) : (
             documents[activeDoc]
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
