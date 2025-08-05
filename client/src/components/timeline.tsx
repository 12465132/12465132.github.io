import { useState, useEffect } from "react";
import { TimelineScenario } from "@shared/schema";
import { TIMELINE_MILESTONES } from "@/lib/climate-data";
import {
  HISTORICAL_TEMPERATURE_DATA,
  temperatureToChartY,
} from "@/lib/temperature-data";
import { Fullscreen } from "lucide-react";

interface TimelineProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  scenario: TimelineScenario;
  onScenarioChange: (scenario: TimelineScenario) => void;
  temperature: number;
}

export default function Timeline({
  currentYear,
  onYearChange,
  scenario,
  onScenarioChange,
  temperature,
}: TimelineProps) {
  const [showFutureOptions, setShowFutureOptions] = useState(false);

  useEffect(() => {
    // Always show future options (temperature projection chart)
    setShowFutureOptions(true);
  }, [currentYear]);

  const scenarios = [
    {
      id: "optimistic" as const,
      name: "Optimistic",
      target: "1.5°C by 2100",
      color: "bg-emerald-500",
      borderColor: "border-emerald-500/30",
      bgColor: "bg-emerald-500/20",
    },
    {
      id: "realistic" as const,
      name: "Realistic",
      target: "2.5°C by 2100",
      color: "bg-amber-500",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/20",
    },
    {
      id: "pessimistic" as const,
      name: "Pessimistic",
      target: "3.5°C by 2100",
      color: "bg-red-500",
      borderColor: "border-red-500/30",
      bgColor: "bg-red-500/20",
    },
  ];

  const getTrackColor = () => {
    if (currentYear <= 2024) {
      return "bg-gradient-to-r from-slate-600 to-blue-500";
    }
    const selectedScenario = scenarios.find((s) => s.id === scenario);
    return selectedScenario?.color || "bg-amber-500";
  };

  const getProgressWidth = () => {
    const totalRange = 2100 - 1880;
    const currentProgress = (currentYear - 1880) / totalRange;
    return Math.min(Math.max(currentProgress * 100, 0), 100);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-600 z-40">
      {/* Timeline Header */}
      <div className="px-6 py-4 border-b border-slate-600/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="font-semibold">Climate Timeline Navigator</h3>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            Drag the timeline to navigate through time
          </div>
        </div>
      </div>

      {/* Main Timeline */}
      <div className="px-6 py-6">
        <div className="relative">
          {/* Timeline Track */}
          <div className="relative h-12 bg-slate-700 rounded-lg overflow-hidden">
            {/* Progress Track */}
            <div
              className={`absolute left-0 top-0 h-full ${getTrackColor()} transition-all duration-300`}
              style={{ width: `${getProgressWidth()}%` }}
            />

            {/* Timeline Slider */}
            <input
              type="range"
              min={1880}
              max={2100}
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 timeline-slider"
            />

            {/* Event Markers */}
            {TIMELINE_MILESTONES.map((milestone, index) => {
              const position = ((milestone.year - 1880) / (2100 - 1880)) * 100;
              return (
                <div
                  key={milestone.year}
                  className="absolute top-1/2 w-0.5 h-6 bg-slate-400 transform -translate-y-1/2 z-5"
                  style={{ left: `${position}%` }}
                  title={`${milestone.label} (${milestone.year})`}
                />
              );
            })}
          </div>

          {/* Timeline Labels */}
          <div className="flex justify-between mt-3 text-xs text-slate-400">
            {TIMELINE_MILESTONES.map((milestone) => (
              <div key={milestone.year} className="flex flex-col items-center">
                <span>{milestone.year}</span>
                <span className="text-xs text-slate-500">
                  {milestone.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Scenario Selector */}
      {
        <div className="px-6 pb-6">
          <div className="text-sm font-medium mb-3">Future Scenarios</div>
          <div className="flex space-x-3">
            {scenarios.map((scenarioOption) => (
              <button
                key={scenarioOption.id}
                onClick={() => onScenarioChange(scenarioOption.id)}
                className={`
                  flex-1 ${scenarioOption.bgColor} border ${scenarioOption.borderColor} rounded-lg p-3 text-center 
                  hover:opacity-80 transition-all duration-200 transform hover:-translate-y-0.5
                  ${scenario === scenarioOption.id ? "ring-2 ring-blue-500" : ""}
                `}
              >
                <div
                  className={`text-sm font-medium ${scenarioOption.color.replace("bg-", "text-")}`}
                >
                  {scenarioOption.name}
                </div>
                <div className="text-xs text-slate-400">
                  {scenarioOption.target}
                </div>
              </button>
            ))}
          </div>
        </div>
      }

      {/* Temperature Projection Chart */}
      {showFutureOptions && (
        <div className="px-6 pb-6">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="text-sm font-medium mb-3 flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Global Temperature Rise Projections
            </div>
            <div className="relative h-24">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border-b border-slate-600/30" />
                ))}
              </div>

              {/* Temperature Lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="true"
              >
                {/* Calculate positions aligned with timeline */}
                {(() => {
                  const getXPosition = (year: number) =>
                    ((year - 1880) / (2100 - 1880)) * (typeof window !== 'undefined' ? window.innerWidth : 1000);
                  const startX = getXPosition(1880);
                  const presentX = getXPosition(2024);
                  const endX = getXPosition(2100);

                  // Create path for historical temperature data
                  const historicalPath = HISTORICAL_TEMPERATURE_DATA.map(
                    (data, index) => {
                      const x = getXPosition(data.year);
                      const y = temperatureToChartY(data.smoothed);
                      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                    },
                  ).join(" ");

                  // Get current temperature for smooth transition to future projections
                  const currentTempData = HISTORICAL_TEMPERATURE_DATA.find(
                    (d) => d.year === 2024,
                  );
                  const currentTempY = currentTempData
                    ? temperatureToChartY(currentTempData.smoothed)
                    : 25;

                  return (
                    <>
                      {/* Historical temperature trend (1880-2024) - using real NASA data */}
                      <path
                        d={historicalPath}
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        fill="none"
                        className="drop-shadow-sm"
                      />

                      {/* Future projections (2024-2100) */}
                      <path
                        d={`M ${presentX} ${currentTempY} Q ${(presentX + endX) / 2} ${currentTempY - 5} ${endX} ${currentTempY - 10}`}
                        stroke="#10B981"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4,2"
                        opacity={scenario === "optimistic" ? 1 : 0.3}
                      />
                      <path
                        d={`M ${presentX} ${currentTempY} Q ${(presentX + endX) / 2} ${currentTempY - 15} ${endX} ${currentTempY - 25}`}
                        stroke="#F59E0B"
                        strokeWidth="2"
                        fill="none"
                        opacity={scenario === "realistic" ? 1 : 0.3}
                      />
                      <path
                        d={`M ${presentX} ${currentTempY} Q ${(presentX + endX) / 2} ${currentTempY - 25} ${endX} ${currentTempY - 40}`}
                        stroke="#EF4444"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="2,2"
                        opacity={scenario === "pessimistic" ? 1 : 0.3}
                      />

                      {/* Current year indicator */}
                      <circle
                        cx={getXPosition(currentYear)}
                        cy={(() => {
                          if (currentYear <= 2024) {
                            const tempData = HISTORICAL_TEMPERATURE_DATA.find(
                              (d) => d.year === currentYear,
                            );
                            return tempData
                              ? temperatureToChartY(tempData.smoothed)
                              : currentTempY;
                          }
                          return currentTempY;
                        })()}
                        r="4"
                        fill={
                          currentYear <= 2024
                            ? "#3B82F6"
                            : scenarios
                                .find((s) => s.id === scenario)
                                ?.color.replace("bg-", "#") || "#F59E0B"
                        }
                        className="animate-pulse drop-shadow-md"
                        stroke="white"
                        strokeWidth="1"
                      />

                      {/* Milestone markers aligned with timeline */}
                      {TIMELINE_MILESTONES.map((milestone) => {
                        const x = getXPosition(milestone.year);
                        return (
                          <line
                            key={milestone.year}
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="100"
                            stroke="#64748B"
                            strokeWidth="0.5"
                            strokeDasharray="2,2"
                            opacity="0.5"
                          />
                        );
                      })}
                    </>
                  );
                })()}
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 -ml-12">
                <span>+2.0°C</span>
                <span>+1.5°C</span>
                <span>+1.0°C</span>
                <span>+0.5°C</span>
                <span>+0.0°C</span>
                <span>-0.5°C</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
