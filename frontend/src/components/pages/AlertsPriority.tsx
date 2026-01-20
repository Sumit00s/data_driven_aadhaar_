import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useEffect, useState } from 'react';
import { FilterState } from '../../App';
import { AlertCircle } from 'lucide-react';

interface AlertsPriorityProps {
  filters: FilterState;
}

interface AlertItem {
  region: string;
  issue_type: string;
  severity: 'Critical' | 'High' | 'Medium';
  metric_value: string;
  reason: string;
  period: string;
}

// ⏳ Severity trend kept mock
const severityTrend = [
  { month: 'Aug', critical: 12, high: 18, medium: 24 },
  { month: 'Sep', critical: 14, high: 21, medium: 27 },
  { month: 'Oct', critical: 13, high: 19, medium: 25 },
  { month: 'Nov', critical: 15, high: 23, medium: 29 },
  { month: 'Dec', critical: 16, high: 24, medium: 31 },
  { month: 'Jan', critical: 18, high: 26, medium: 33 }
];

const pieColors = ['#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4'];

export function AlertsPriority({ filters }: AlertsPriorityProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/alerts/priority')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Alerts fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading alerts…</div>;
  }

  // 🔹 Build pie summary dynamically
  const alertSummary = Object.values(
    alerts.reduce((acc: any, alert) => {
      acc[alert.issue_type] = acc[alert.issue_type] || {
        type: alert.issue_type,
        count: 0
      };
      acc[alert.issue_type].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Alerts & Priority List
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Daily administrative attention and follow-up tracking
        </p>
      </div>

      {/* ACTIVE ALERTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          Active Alerts Requiring Attention
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                  Region
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                  Issue Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                  Severity
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                  Period
                </th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {alert.region}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {alert.issue_type}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded font-medium ${
                        alert.severity === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : alert.severity === 'High'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {alert.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISTRIBUTION + TREND */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Alert Distribution by Issue Type
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={alertSummary}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                nameKey="type"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {alertSummary.map((_, index) => (
                  <Cell
                    key={index}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Alert Severity Trend
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={severityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="critical" fill="#ef4444" />
              <Bar dataKey="high" fill="#f59e0b" />
              <Bar dataKey="medium" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ACTION PANEL */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
          <h4 className="text-sm font-semibold text-gray-900">
            Priority Administrative Actions
          </h4>
        </div>
        <div className="bg-white rounded p-4">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • Focus immediate intervention on regions with Critical alerts.
            </li>
            <li>
              • Deploy enrolment and update drives in high-neglect areas.
            </li>
            <li>
              • Coordinate across states for migration-heavy districts.
            </li>
            <li>
              • Monitor medium alerts to prevent escalation.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
