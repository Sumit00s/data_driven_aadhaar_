import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import { FilterState } from '../../App';

// ⏳ KEEP MOCK DATA for parts not yet backed by API
import {
  biometricStressRegions,
  elderlyVulnerabilityData,
  biometricProblemRegions
} from '../../../../data/mock/biometricData';

interface UpdatesBiometricProps {
  filters: FilterState;
}

interface UpdateNeglectData {
  state: string;
  update_neglect_percentage: number;
}

export function UpdatesBiometric({ filters }: UpdatesBiometricProps) {
  const [updateNeglectData, setUpdateNeglectData] = useState<UpdateNeglectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/metrics/biometric/update-neglect')
      .then(res => res.json())
      .then(data => {
        setUpdateNeglectData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Update neglect fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading biometric data…</div>;
  }

  if (!updateNeglectData.length) {
    return <div className="p-8 text-red-600">No biometric data available</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Updates & Biometric Health
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Monitoring data freshness and biometric authentication reliability
        </p>
      </div>

      {/* UPDATE NEGLECT + BIOMETRIC STRESS */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* 🔴 REAL BACKEND DATA */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Update Neglect by State
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={updateNeglectData}>
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
                dataKey="update_neglect_percentage"
                fill="#f59e0b"
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Percentage of Aadhaar records with delayed biometric updates
          </p>
        </div>

        {/* ⏳ STILL MOCK */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Biometric Stress Rate by Region
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={biometricStressRegions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 11 }}
                stroke="#9ca3af"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="stressRate" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Biometric authentication failure rate (%)
          </p>
        </div>
      </div>

      {/* ELDERLY + PROBLEM REGIONS */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* MOCK */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Elderly Biometric Vulnerability
          </h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={elderlyVulnerabilityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis
                type="category"
                dataKey="ageGroup"
                width={90}
                tick={{ fontSize: 11 }}
                stroke="#9ca3af"
              />
              <Tooltip />
              <Bar dataKey="issueRate" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* MOCK */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Regions with Update / Biometric Issues
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-3 text-xs text-left">Region</th>
                  <th className="py-2 px-3 text-xs text-left">Severity</th>
                </tr>
              </thead>
              <tbody>
                {biometricProblemRegions.map(item => (
                  <tr key={item.region} className="border-b">
                    <td className="py-2.5 px-3">
                      <p className="text-sm font-medium">{item.region}</p>
                      <p className="text-xs text-gray-600">{item.issue}</p>
                    </td>
                    <td className="py-2.5 px-3">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* OBSERVATIONS */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-5">
        <h4 className="text-sm font-semibold mb-2">Key Observations</h4>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>
            • States with high update neglect show increased authentication risk.
          </li>
          <li>
            • Elderly populations are disproportionately affected by biometric failures.
          </li>
          <li>
            • Targeted biometric refresh drives are required in high-neglect states.
          </li>
        </ul>
      </div>
    </div>
  );
}
