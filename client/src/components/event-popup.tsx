import { ClimateEvent } from "@shared/schema";

interface EventPopupProps {
  event: ClimateEvent | null;
  onClose: () => void;
}

export default function EventPopup({ event, onClose }: EventPopupProps) {
  if (!event) return null;

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'disaster':
        return 'text-red-500';
      case 'policy':
        return 'text-blue-500';
      case 'historical':
        return 'text-amber-500';
      default:
        return 'text-slate-400';
    }
  };

  const getImpactLevel = (event: ClimateEvent) => {
    // Get damage estimates based on the disaster data provided
    const damageCosts: { [key: string]: string } = {
      'Hurricane Katrina': '$182 billion, >1,085 deaths',
      'Hurricane Harvey': '$141 billion, 89 deaths',
      'Hurricane Maria': '$102 billion, 2,981 deaths',
      'Hurricane Sandy': '$80 billion, 159 deaths',
      'Hurricane Ida': '$75 billion, 96 deaths',
      'Hurricane Andrew': '$54 billion, 62 deaths',
      'China Floods': '$51 billion, 3,600+ deaths',
      'U.S. Midwest Drought': '$48 billion, 454 deaths',
      'Mississippi River Floods': '$41 billion, 48 deaths',
      'Hurricane Ike': '$40 billion, 112 deaths',
      'U.S. Drought & Heat Wave': '$37 billion, 123 deaths',
      'Western U.S. Wildfires': '$26 billion, 106 deaths',
      '2003 European Heatwave': '70,000+ deaths',
      '2019–2020 Australian Bushfires': '33 deaths, 1B+ animals',
      '2021 European Floods': '€46 billion, 200+ deaths'
    };

    const matchedKey = Object.keys(damageCosts).find(key => 
      event.title.toLowerCase().includes(key.toLowerCase().split(' ')[1]) ||
      event.title.includes(key.split(' ')[0])
    );

    if (matchedKey) {
      return damageCosts[matchedKey];
    }

    switch (event.eventType) {
      case 'disaster':
        return 'Major Climate Disaster';
      case 'policy':
        return 'Global Policy Impact';
      case 'historical':
        return 'Transformative Period';
      default:
        return 'Significant Event';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-800 border border-slate-600 rounded-xl max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 scale-100">
        <div className="flex">
          {/* Image Section */}
          <div className="w-1/2">
            <img 
              src={event.imageUrl || 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content Section */}
          <div className="w-1/2 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-slate-400">{event.year}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-slate-300 mb-4">
              <p>{event.description}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-600/50">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Impact:</span>
                  <span className="text-slate-200 font-mono">{getImpactLevel(event)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Type:</span>
                  <span className={`capitalize ${getEventTypeColor(event.eventType)}`}>
                    {event.eventType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
