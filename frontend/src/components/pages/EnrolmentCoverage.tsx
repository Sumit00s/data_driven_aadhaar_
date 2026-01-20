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

// ⏳ KEEP MOCK DATA
import {
  ageWiseDistribution,
  lowCoverageRegions
} from '../../../../data/mock/enrolmentData';

interface EnrolmentCoverageProps {
  filters: FilterState;
}

interface ChildDelayAPI {
  state: string;
  child_delay_percentage: number;
}

// ⏳ Trend stays mock for now
const enrolmentTrend = [
  { month: 'Jul 25', count: 245000 },
  { month: 'Aug 25', count: 268000 },
  { month: 'Sep 25', count: 252000 },
  { month: 'Oct 25', count: 289000 },
  { month: 'Nov 25', count: 271000 },
  { month: 'Dec 25', count: 298000 },
  { month: 'Jan 26', count: 285000 }
];

export function EnrolmentCoverage({ filters }: EnrolmentCoverageProps) {
  const [childDelayData, setChildDelayData] = useState<ChildDelayAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/metrics/enrolment/child-delay')
      .then(res => res.json())
      .then(data => {
        setChildDelayData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Child enrolment API error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading enrolment data…</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Enrolment & Coverage
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Monitoring inclusion and enrolment status across demographics and regions
        </p>
      </div>

      {/* CHILD ENROLMENT DELAY (REAL DATA) */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Delayed Child Enrolment Rate by State
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={childDelayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="state"
                angle={-20}
                textAnchor="end"
                height={90}
                tick={{ fontSize: 11 }}
                stroke="#9ca3af"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Bar
                dataKey="child_delay_percentage"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Percentage of children (0–5 years) enrolled late
          </p>
        </div>

        {/* AGE-WISE DISTRIBUTION (MOCK) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Age-wise Enrolment Distribution
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ageWiseDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis
                type="category"
                dataKey="ageGroup"
                width={120}
              />
              <Tooltip />
              <Bar dataKey="percentage" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TREND + LOW COVERAGE */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Time-based Enrolment Trend
          </h4>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={enrolmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Low-Enrolment Regions
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-xs text-left">Region</th>
                  <th className="py-2 px-3 text-xs text-right">Coverage Gap</th>
                  <th className="py-2 px-3 text-xs text-left">Risk</th>
                </tr>
              </thead>
              <tbody>
                {lowCoverageRegions.map(item => (
                  <tr key={item.region} className="border-b">
                    <td className="py-2.5 px-3 text-sm">{item.region}</td>
                    <td className="py-2.5 px-3 text-sm text-right">
                      {item.coverageGap}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        item.risk === 'High'
                          ? 'bg-red-100 text-red-700'
                          : item.risk === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
