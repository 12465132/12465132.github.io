import { useState, useEffect } from "react";
import { TimelineScenario, ClimateEvent, ClimateParameters } from "@shared/schema";
import { CLIMATE_EVENTS, calculateClimateParameters } from "@/lib/climate-data";
import ClimateMap from "@/components/climate-map";
import Timeline from "@/components/timeline";
import ParametersPanel from "@/components/parameters-panel";
import EventPopup from "@/components/event-popup";

export default function ClimateTimelinePage() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentScenario, setCurrentScenario] = useState<TimelineScenario>('realistic');
  const [selectedEvent, setSelectedEvent] = useState<ClimateEvent | null>(null);
  const [climateParameters, setClimateParameters] = useState<ClimateParameters>(
    calculateClimateParameters(2024, 'realistic')
  );
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isTimelineHidden, setIsTimelineHidden] = useState(false);

  useEffect(() => {
    const newParameters = calculateClimateParameters(currentYear, currentScenario);
    setClimateParameters(newParameters);
  }, [currentYear, currentScenario]);

  const handleParameterChange = (key: keyof ClimateParameters, value: number) => {
    setClimateParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="h-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-slate-800/90 backdrop-blur-sm border-b border-slate-600">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Climate Timeline</h1>
              <p className="text-sm text-slate-400">Interactive Earth Visualization</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsTimelineHidden(!isTimelineHidden)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isTimelineHidden ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                )}
              </svg>
              <span>{isTimelineHidden ? 'Show' : 'Hide'} Timeline</span>
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-full pt-20">
        {/* Map Container */}
        <div className="flex-1 relative">
          <ClimateMap
            currentYear={currentYear}
            events={CLIMATE_EVENTS}
            onEventClick={setSelectedEvent}
            seaLevel={climateParameters.seaLevel}
            temperature={climateParameters.temperature}
          />
        </div>

        {/* Parameters Panel */}
        <ParametersPanel
          parameters={climateParameters}
          onParameterChange={handleParameterChange}
          isCollapsed={isPanelCollapsed}
          onToggleCollapse={() => setIsPanelCollapsed(!isPanelCollapsed)}
        />
      </div>

      {/* Timeline Component */}
      {!isTimelineHidden && (
        <Timeline
          currentYear={currentYear}
          onYearChange={setCurrentYear}
          scenario={currentScenario}
          onScenarioChange={setCurrentScenario}
          temperature={climateParameters.temperature}
        />
      )}

      {/* Event Popup */}
      <EventPopup
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
