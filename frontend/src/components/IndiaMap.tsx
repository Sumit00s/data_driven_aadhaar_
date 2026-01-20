export function IndiaMap() {
  const states = [
    { name: 'Jammu & Kashmir', status: 'low', x: 180, y: 20 },
    { name: 'Punjab', status: 'low', x: 170, y: 60 },
    { name: 'Rajasthan', status: 'medium', x: 140, y: 120 },
    { name: 'Gujarat', status: 'low', x: 100, y: 160 },
    { name: 'Maharashtra', status: 'low', x: 150, y: 200 },
    { name: 'Madhya Pradesh', status: 'medium', x: 180, y: 160 },
    { name: 'Uttar Pradesh', status: 'high', x: 220, y: 100 },
    { name: 'Bihar', status: 'high', x: 270, y: 120 },
    { name: 'West Bengal', status: 'medium', x: 290, y: 150 },
    { name: 'Odisha', status: 'medium', x: 270, y: 190 },
    { name: 'Andhra Pradesh', status: 'low', x: 210, y: 250 },
    { name: 'Karnataka', status: 'low', x: 170, y: 260 },
    { name: 'Tamil Nadu', status: 'low', x: 190, y: 300 },
    { name: 'Kerala', status: 'low', x: 160, y: 310 },
    { name: 'Assam', status: 'high', x: 340, y: 140 },
    { name: 'Jharkhand', status: 'medium', x: 270, y: 150 },
    { name: 'Chhattisgarh', status: 'medium', x: 230, y: 190 },
    { name: 'Telangana', status: 'low', x: 200, y: 230 }
  ];

  const getColor = (status: string) => {
    switch (status) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#e5e7eb';
    }
  };

  return (
    <div className="relative">
      <svg viewBox="0 0 400 350" className="w-full h-auto">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {states.map((state, index) => (
          <g key={index}>
            <circle
              cx={state.x}
              cy={state.y}
              r="18"
              fill={getColor(state.status)}
              opacity="0.85"
              filter="url(#shadow)"
            />
            <circle
              cx={state.x}
              cy={state.y}
              r="18"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </svg>
      
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-600">Low Concern</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs text-gray-600">Medium Concern</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-gray-600">High Concern</span>
        </div>
      </div>
    </div>
  );
}
