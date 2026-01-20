import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useEffect, useState } from 'react';
import { FilterState } from '../../App';

// ⚠️ Keep mock ONLY for update frequency trend (backend later)
import { updateFrequencyTrend } from '../../../../data/mock/migrationData';

interface MigrationFreshnessProps {
  filters: FilterState;
}

interface MigrationData {
  state: string;
  migration_mismatch_percentage: number;
}

export function MigrationFreshness({ filters }: MigrationFreshnessProps) {
  const [migrationData, setMigrationData] = useState<MigrationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/metrics/migration/mismatch')
      .then(res => res.json())
      .then(data => {
        setMigrationData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Migration fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading migration data…</div>;
  }

  if (!migrationData.length) {
    return <div className="p-8 text-red-600">No migration data available</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Migration & Data Freshness
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Tracking population mobility and address update patterns
        </p>
      </div>

      {/* MIGRATION MISMATCH + UPDATE FREQUENCY */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Enrolment vs Update Location Mismatch
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={migrationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="state"
                tick={{ fontSize: 11 }}
                angle={-20}
                textAnchor="end"
                height={90}
                stroke="#9ca3af"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Bar
                dataKey="migration_mismatch_percentage"
                fill="#8b5cf6"
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Percentage difference between enrolment and update locations
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Update Frequency Trend
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={updateFrequencyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="updates"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Update activity trend reflecting migration behaviour
          </p>
        </div>
      </div>

      {/* HIGH MIGRATION STATES TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          High Migration States
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-xs text-left">State</th>
                <th className="py-3 px-4 text-xs text-right">
                  Migration Mismatch %
                </th>
                <th className="py-3 px-4 text-xs text-left">Severity</th>
              </tr>
            </thead>
            <tbody>
              {migrationData.map(item => {
                const severity =
                  item.migration_mismatch_percentage >= 20
                    ? 'High'
                    : item.migration_mismatch_percentage >= 10
                    ? 'Medium'
                    : 'Low';

                return (
                  <tr
                    key={item.state}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.state}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold">
                      {item.migration_mismatch_percentage}%
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded ${
                          severity === 'High'
                            ? 'bg-red-100 text-red-700'
                            : severity === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {severity}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          States where Aadhaar enrolment and update activity diverge significantly
        </p>
      </div>

      {/* ANALYSIS PANEL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Migration Impact Analysis
        </h4>
        <div className="bg-white rounded p-4">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Population mobility:</span>{' '}
              High mismatch indicates residents enrolled in one state but living
              and updating in another.
            </li>
            <li>
              <span className="font-medium">Service delivery risk:</span>{' '}
              Address mismatches can affect subsidy distribution and benefits.
            </li>
            <li>
              <span className="font-medium">Data freshness:</span>{' '}
              Migrant populations update Aadhaar data less frequently.
            </li>
            <li className="pt-1">
              <span className="font-medium">Recommended action:</span>{' '}
              Deploy mobile Aadhaar update units in high-migration destination
              states (Delhi NCR, Maharashtra, Gujarat).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
