import React from 'react';
import { RiskLevel } from '../types';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  let colorClass = '';
  let Icon = CheckCircle2;

  switch (level) {
    case RiskLevel.ALTO:
      colorClass = 'bg-red-100 text-red-800 border-red-200';
      Icon = AlertTriangle;
      break;
    case RiskLevel.MEDIO:
      colorClass = 'bg-amber-100 text-amber-800 border-amber-200';
      Icon = AlertCircle;
      break;
    case RiskLevel.BAJO:
      colorClass = 'bg-green-100 text-green-800 border-green-200';
      Icon = CheckCircle2;
      break;
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${colorClass}`}>
      <Icon className="w-4 h-4 mr-2" />
      Nivel de Riesgo: {level}
    </span>
  );
};

export default RiskBadge;
