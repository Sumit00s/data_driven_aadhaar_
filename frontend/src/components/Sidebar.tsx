import { Home, AlertTriangle, Users, RefreshCw, Navigation, Bell } from 'lucide-react';
import { PageType } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const menuItems = [
  { id: 'overview' as PageType, label: 'Overview', icon: Home },
  { id: 'asi' as PageType, label: 'Aadhaar Stress Index (ASI)', icon: AlertTriangle },
  { id: 'enrolment' as PageType, label: 'Enrolment & Coverage', icon: Users },
  { id: 'updates' as PageType, label: 'Updates & Biometric Health', icon: RefreshCw },
  { id: 'migration' as PageType, label: 'Migration & Data Freshness', icon: Navigation },
  { id: 'alerts' as PageType, label: 'Alerts & Priority List', icon: Bell }
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">आ</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">UIDAI</h1>
            <p className="text-xs text-gray-600">Governance Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Aadhaar Governance Monitoring Dashboard
        </p>
        <p className="text-xs text-gray-400 text-center mt-1">
          Version 1.0 | Ministry of Electronics & IT
        </p>
      </div>
    </div>
  );
}
