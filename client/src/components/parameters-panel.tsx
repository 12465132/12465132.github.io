import { ClimateParameters } from "@shared/schema";

interface ParametersPanelProps {
  parameters: ClimateParameters;
  onParameterChange: (key: keyof ClimateParameters, value: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function ParametersPanel({ 
  parameters, 
  onParameterChange, 
  isCollapsed, 
  onToggleCollapse 
}: ParametersPanelProps) {
  const visualEffects = [
    {
      key: 'wildfires' as const,
      label: 'Wildfires',
      icon: (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-red-500/20'
    },
    {
      key: 'pollution' as const,
      label: 'Pollution',
      icon: (
        <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm7-11a1 1 0 011-1h4a1 1 0 011 1v8a3 3 0 11-6 0V4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-slate-500/20'
    },
    {
      key: 'iceLoss' as const,
      label: 'Ice Loss',
      icon: (
        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.415 5 5 0 010-7.071 1 1 0 011.415 0zm4.243 0a1 1 0 011.414 0 5 5 0 010 7.07 1 1 0 01-1.414-1.414 3 3 0 000-4.243 1 1 0 010-1.414zM10 8a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-blue-500/20'
    },
    {
      key: 'drought' as const,
      label: 'Drought',
      icon: (
        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ),
      color: 'bg-amber-500/20'
    },
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 bg-slate-800 border-l border-slate-600 flex flex-col items-center py-4 z-40">
        <button 
          onClick={onToggleCollapse}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-600 flex flex-col z-40">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 border-b border-slate-600">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Climate Parameters</h2>
            <button 
              onClick={onToggleCollapse}
              className="p-1 hover:bg-slate-700 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Sea Level Rise */}
        <div className="p-6 border-b border-slate-600/50">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium">Sea Level Rise</label>
            <span className="text-sm text-blue-500 font-mono">+{parameters.seaLevel}cm</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={parameters.seaLevel}
            onChange={(e) => onParameterChange('seaLevel', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>0cm</span>
            <span>+2m</span>
          </div>
        </div>
        
        {/* Global Temperature */}
        <div className="p-6 border-b border-slate-600/50">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium">Global Temperature</label>
            <span className="text-sm text-amber-500 font-mono">+{parameters.temperature}°C</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={parameters.temperature}
            onChange={(e) => onParameterChange('temperature', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>0°C</span>
            <span>+5°C</span>
          </div>
        </div>
        
        {/* Visual Effects */}
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4">Visual Effects</h3>
          <div className="grid grid-cols-2 gap-3">
            {visualEffects.map((effect) => (
              <div key={effect.key} className={`${effect.color} rounded-lg p-3 text-center`}>
                <div className="w-8 h-8 mx-auto mb-2 bg-slate-700/30 rounded-lg flex items-center justify-center">
                  {effect.icon}
                </div>
                <div className="text-xs font-medium">{effect.label}</div>
                <div className="text-xs text-slate-400">{parameters[effect.key]}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
