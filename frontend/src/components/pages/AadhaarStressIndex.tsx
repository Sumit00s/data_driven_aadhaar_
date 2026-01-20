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
import { IndiaMap } from '../IndiaMap';

interface AadhaarStressIndexProps {
  filters: FilterState;
}

interface ASIData {
  state: string;
  enrolment_delay: number;
  update_neglect: number;
  migration_mismatch: number;
  asi_score: number;
  category: 'High' | 'Medium' | 'Low';
}

export function AadhaarStressIndex({ filters }: AadhaarStressIndexProps) {
  const [asiData, setAsiData] = useState<ASIData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/metrics/asi")
    .then(res => res.json())
    .then(data => {
      console.log("ASI DATA RECEIVED:", data);
      setAsiData(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("ASI FETCH ERROR:", err);
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <div className="p-8 text-gray-600">
        Loading Aadhaar Stress Index…
      </div>
    );
  }

  if (!asiData.length) {
    return (
      <div className="p-8 text-red-600">
        No ASI data available
      </div>
    );
  }

  const topRegion = asiData[0];

  const asiBreakdown = [
    { factor: 'Enrolment Delay', contribution: topRegion.enrolment_delay },
    { factor: 'Update Neglect', contribution: topRegion.update_neglect },
    { factor: 'Migration Mismatch', contribution: topRegion.migration_mismatch }
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Aadhaar Stress Index (ASI)
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Regional prioritization and stress assessment based on composite metrics
        </p>
      </div>

      {/* MAP + BREAKDOWN */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            State-Level ASI Score Map
          </h4>
          <IndiaMap />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            ASI Contribution Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={asiBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis
                type="category"
                dataKey="factor"
                width={140}
                stroke="#9ca3af"
              />
              <Tooltip />
              <Bar dataKey="contribution" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3">
            Contribution of indicators for top priority state
          </p>
        </div>
      </div>

      {/* ASI RANKINGS */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          ASI State Rankings
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-xs text-left">Rank</th>
                <th className="py-3 px-4 text-xs text-left">State</th>
                <th className="py-3 px-4 text-xs text-left">ASI Score</th>
                <th className="py-3 px-4 text-xs text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {asiData.map((item, index) => (
                <tr key={item.state} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-medium">
                    {item.state}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold">
                    {item.asi_score}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded ${
                        item.category === 'High'
                          ? 'bg-red-100 text-red-700'
                          : item.category === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXPLANATION */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Stress Classification Explanation
        </h4>
        <div className="bg-white rounded p-4">
          <p className="text-sm font-medium mb-2">
            Why {topRegion.state} is classified as {topRegion.category} Stress:
          </p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li>
              • Enrolment delay contributes {topRegion.enrolment_delay}% indicating
              delayed Aadhaar generation, especially among children.
            </li>
            <li>
              • Update neglect at {topRegion.update_neglect}% reflects outdated
              demographic or biometric records.
            </li>
            <li>
              • Migration mismatch of {topRegion.migration_mismatch}% highlights
              population mobility and service access gaps.
            </li>
            <li className="font-medium pt-1">
              Composite ASI score: {topRegion.asi_score}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
