import React from 'react';
import { BookOpenCheck } from 'lucide-react';

const LegalReference: React.FC<{ basis: string[] }> = ({ basis }) => {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 h-full">
      <div className="flex items-center space-x-2 mb-3">
        <div className="bg-blue-100 p-1.5 rounded-lg">
             <BookOpenCheck className="h-4 w-4 text-blue-700" />
        </div>
        <h3 className="font-bold text-slate-700 text-sm">Normativa Aplicable</h3>
      </div>
      
      <div className="space-y-2">
        {basis.map((item, idx) => (
          <div key={idx} className="flex items-start group">
            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></span>
            <p className="text-xs text-slate-600 font-medium leading-snug">{item}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-200">
        <p className="text-[10px] text-slate-400 font-medium text-center">
            Verificar vigencia en Gaceta Oficial del Estado
        </p>
      </div>
    </div>
  );
};

export default LegalReference;