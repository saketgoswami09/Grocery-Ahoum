import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { locations } from '@/data/locations';
import type { LocationOption } from '@/types';
import { MapPin, Search, Check } from 'lucide-react';

export default function LocationScreen() {
  const navigate = useNavigate();
  const setLocation = useAuthStore((s) => s.setLocation);
  const [selected, setSelected] = useState<LocationOption | null>(null);
  const [search, setSearch] = useState('');

  const filtered = locations.filter((l) =>
    l.zone.toLowerCase().includes(search.toLowerCase()) || l.area.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (selected) { setLocation(selected); navigate('/home', { replace: true }); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center px-6 pt-10 max-w-md mx-auto w-full">
        {/* Location illustration — replace with your own image */}
        <div className="relative w-40 h-40 mb-6 animate-success-pop">
          <img src="/images/location-map.png" alt="Select location" className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          {/* Fallback icon if image missing */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-[24px] font-bold text-dark mb-2 text-center">Select Your Location</h1>
        <p className="text-gray text-sm text-center mb-8 max-w-[280px] leading-relaxed">
          Switch on your location to stay in tune with what's happening in your area
        </p>

        {/* Search */}
        <div className="w-full mb-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your area..."
            className="w-full bg-gray-lightest rounded-[var(--radius-md)] pl-11 pr-4 py-3.5 text-sm text-dark placeholder:text-gray-light outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            id="location-search" />
        </div>

        {/* Location options */}
        <div className="w-full flex flex-col gap-2 max-h-[250px] overflow-y-auto no-scrollbar mb-6">
          {filtered.map((loc, index) => (
            <button key={loc.id} onClick={() => setSelected(loc)}
              className={`w-full text-left px-4 py-3.5 rounded-[var(--radius-md)] border-2 transition-all duration-200 animate-fade-in ${
                selected?.id === loc.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-lighter hover:border-gray-light hover:bg-gray-lightest/50'
              }`} style={{ animationDelay: `${index * 50}ms` }} id={`location-${loc.id}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selected?.id === loc.id ? 'bg-primary/10' : 'bg-gray-lightest'}`}>
                  <MapPin className={`w-4 h-4 ${selected?.id === loc.id ? 'text-primary' : 'text-gray'}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-dark">{loc.zone}</p>
                  <p className="text-xs text-gray">{loc.area}, {loc.city}</p>
                </div>
                {selected?.id === loc.id && <Check className="ml-auto w-5 h-5 text-primary" />}
              </div>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-sm text-gray text-center py-8">No locations found</p>}
        </div>

        <button onClick={handleSubmit} disabled={!selected}
          className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button disabled:opacity-50 disabled:cursor-not-allowed mt-auto mb-10"
          id="location-submit-btn">Submit</button>
      </div>
    </div>
  );
}
