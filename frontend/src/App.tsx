import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './components/pages/Overview';
import { AadhaarStressIndex } from './components/pages/AadhaarStressIndex';
import { EnrolmentCoverage } from './components/pages/EnrolmentCoverage';
import { UpdatesBiometric } from './components/pages/UpdatesBiometric';
import { MigrationFreshness } from './components/pages/MigrationFreshness';
import { AlertsPriority } from './components/pages/AlertsPriority';

export type PageType = 'overview' | 'asi' | 'enrolment' | 'updates' | 'migration' | 'alerts';

export interface FilterState {
  timePeriod: string;
  state: string;
  district: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const [filters, setFilters] = useState<FilterState>({
    timePeriod: 'January 2026',
    state: 'All States',
    district: 'All Districts'
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview filters={filters} />;
      case 'asi':
        return <AadhaarStressIndex filters={filters} />;
      case 'enrolment':
        return <EnrolmentCoverage filters={filters} />;
      case 'updates':
        return <UpdatesBiometric filters={filters} />;
      case 'migration':
        return <MigrationFreshness filters={filters} />;
      case 'alerts':
        return <AlertsPriority filters={filters} />;
      default:
        return <Overview filters={filters} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header filters={filters} onFiltersChange={setFilters} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
