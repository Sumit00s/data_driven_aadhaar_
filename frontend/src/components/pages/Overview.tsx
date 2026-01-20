import { AlertTriangle, Users, RefreshCw, Activity } from 'lucide-react';
import { StatCard } from '../StatCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FilterState } from '../../App';
import { IndiaMap } from '../IndiaMap';

// ✅ IMPORT MOCK DATA
import {
  overviewSummary,
  topPriorityStates
} from '../../../../data/mock/overviewData';

interface OverviewProps {
  filters: FilterState;
}

// (Keep trends mock for now – backend later)
const enrolmentTrend = [
  { month: 'Jul', value: 245000 },
  { month: 'Aug', value: 268000 },
  { month: 'Sep', value: 252000 },
  { month: 'Oct', value: 289000 },
  { month: 'Nov', value: 271000 },
  { month: 'Dec', value: 298000 },
  { month: 'Jan', value: 285000 }
];

const updateTrend = [
  { month: 'Jul', value: 412000 },
  { month: 'Aug', value: 398000 },
  { month: 'Sep', value: 425000 },
  { month: 'Oct', value: 441000 },
  { month: 'Nov', value: 438000 },
  { month: 'Dec', value: 456000 },
  { month: 'Jan', value: 469000 }
];

export function Overview({ filters }: OverviewProps) {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">National Overview</h3>
        <p className="text-sm text-gray-600 mt-1">
          Monitoring period: {filters.timePeriod} • Geographic scope: {filters.state}
        </p>
      </div>

      {/* ✅ SUMMARY CARDS (DATA-DRIVEN) */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard
          title="High-Risk Districts"
          value={overviewSummary.highRiskDistricts}
          icon={AlertTriangle}
          severity="high"
          subtitle="Requiring immediate attention"
        />
        <StatCard
          title="Delayed Child Enrolment"
          value={overviewSummary.delayedChildEnrolmentDistricts}
          icon={Users}
          severity="medium"
          subtitle="Districts with significant delays"
        />
        <StatCard
          title="High Update Neglect"
          value={overviewSummary.highUpdateNeglectDistricts}
          icon={RefreshCw}
          severity="medium"
          subtitle="Districts with low update rates"
        />
        <StatCard
          title="Biometric Stress Districts"
          value={overviewSummary.highBiometricStressDistricts}
          icon={Activity}
          severity="high"
          subtitle="Elderly population concerns"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">India Status Map</h4>
          <IndiaMap />
        </div>

        {/* ✅ PRIORITY STATES (DATA-DRIVEN) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Top Priority States
          </h4>
          <div className="space-y-3">
            {topPriorityStates.map((item) => (
              <div
                key={item.state}
                className="pb-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.state}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      item.severity === 'High'
                        ? 'bg-red-100 text-red-700'
                        : item.severity === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{item.primaryIssue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRENDS (still mock) */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Enrolment Activity Trend
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={enrolmentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Monthly enrolment count (national)
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Update Activity Trend
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={updateTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#059669"
                strokeWidth={2}
                dot={{ fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Monthly update count (national)
          </p>
        </div>
      </div>
    </div>
  );
}

