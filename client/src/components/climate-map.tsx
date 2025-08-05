import { useEffect, useRef, useState } from "react";
import { ClimateEvent } from "@shared/schema";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ClimateMapProps {
  currentYear: number;
  events: ClimateEvent[];
  onEventClick: (event: ClimateEvent) => void;
  seaLevel: number;
  temperature: number;
}

export default function ClimateMap({ 
  currentYear, 
  events, 
  onEventClick, 
  seaLevel, 
  temperature 
}: ClimateMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [30, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: false,
    });

    // Create earth map tile layer using the provided earth map image
    const earthImageUrl = import.meta.env.VITE_EARTH_MAP_URL || "@assets/8081_earthmap10k_1754244934127.jpg";
    
    // Create a custom tile layer using the earth map image
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add relevant events for current year
    const relevantEvents = events.filter(event => event.year <= currentYear);
    
    relevantEvents.forEach(event => {
      const iconColor = event.eventType === 'disaster' ? '#EF4444' : 
                       event.eventType === 'policy' ? '#3B82F6' : '#F59E0B';
      
      // Determine marker size based on event significance
      const getMarkerSize = (event: ClimateEvent) => {
        if (event.eventType === 'policy') return { size: 28, inner: 3 };
        
        // For disasters, vary size based on historical impact (approximated by year and severity)
        const majorDisasters = ['Hurricane Katrina', 'Hurricane Harvey', 'Hurricane Maria', 'Hurricane Sandy'];
        if (majorDisasters.some(name => event.title.includes(name.split(' ')[1]))) {
          return { size: 32, inner: 4 };
        }
        return { size: 24, inner: 2 };
      };
      
      const markerSize = getMarkerSize(event);
      
      const marker = L.marker([event.latitude, event.longitude], {
        icon: L.divIcon({
          className: 'custom-event-marker',
          html: `
            <div class="rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center animate-pulse transition-all hover:scale-110" 
                 style="background-color: ${iconColor}; width: ${markerSize.size}px; height: ${markerSize.size}px;"
                 title="${event.title} (${event.year})">
              <div class="bg-white rounded-full" style="width: ${markerSize.inner}px; height: ${markerSize.inner}px;"></div>
            </div>
          `,
          iconSize: [markerSize.size, markerSize.size],
          iconAnchor: [markerSize.size/2, markerSize.size/2],
        })
      });

      marker.on('click', () => onEventClick(event));
      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
  }, [currentYear, events, onEventClick]);

  return (
    <div className="relative w-full h-full z-0">
      <div ref={mapRef} className="w-full h-full z-0" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-50 flex flex-col space-y-2">
        <button 
          onClick={() => mapInstanceRef.current?.zoomIn()}
          className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          onClick={() => mapInstanceRef.current?.zoomOut()}
          className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Current Year Display */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-full px-6 py-3">
          <div className="text-center">
            <div className="text-2xl font-bold">{currentYear}</div>
            <div className="text-sm text-slate-400">Current Year</div>
          </div>
        </div>
      </div>

      {/* Climate Effects Overlay */}
      {temperature > 2 && (
        <div className="absolute inset-0 bg-red-500/10 pointer-events-none z-40" />
      )}
      {seaLevel > 50 && (
        <div className="absolute bottom-0 left-0 right-0 bg-blue-500/20 pointer-events-none z-40" 
             style={{ height: `${Math.min(seaLevel / 2, 20)}%` }} />
      )}
    </div>
  );
}
