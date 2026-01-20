import { Calendar, MapPin } from 'lucide-react';
import { FilterState } from '../App';

interface HeaderProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const timePeriods = [
  'January 2026', 'December 2025', 'November 2025', 'October 2025', 'September 2025'
];

const states = [
  'All States', 'Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 
  'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat'
];

export function Header({ filters, onFiltersChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Aadhaar Governance Monitoring Dashboard</h2>
          <p className="text-sm text-gray-600 mt-0.5">Real-time monitoring and decision support for Aadhaar administration</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={filters.timePeriod}
              onChange={(e) => onFiltersChange({ ...filters, timePeriod: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timePeriods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <select
              value={filters.state}
              onChange={(e) => onFiltersChange({ ...filters, state: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
