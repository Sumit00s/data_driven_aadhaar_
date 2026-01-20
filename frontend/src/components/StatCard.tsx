import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  severity?: 'low' | 'medium' | 'high';
  subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, severity, subtitle }: StatCardProps) {
  const severityColors = {
    low: 'bg-green-50 text-green-700 border-green-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    high: 'bg-red-50 text-red-700 border-red-200'
  };

  const iconColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  const bgColor = severity ? severityColors[severity] : 'bg-white border-gray-200';
  const iconColor = severity ? iconColors[severity] : 'text-blue-600';

  return (
    <div className={`border rounded-lg p-5 ${bgColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-2.5 rounded-lg ${severity ? 'bg-white/60' : 'bg-blue-50'}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
