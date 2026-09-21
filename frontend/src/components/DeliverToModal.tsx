import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface DeliverToModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  currentZip: string;
  onSaveLocation: (city: string, zip: string) => void;
}

export const DeliverToModal: React.FC<DeliverToModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  currentZip,
  onSaveLocation,
}) => {
  if (!isOpen) return null;

  const [city, setCity] = useState(currentCity);
  const [zip, setZip] = useState(currentZip);

  const presets = [
    { city: 'Seattle', zip: '98101' },
    { city: 'New York', zip: '10001' },
    { city: 'San Francisco', zip: '94105' },
    { city: 'Austin', zip: '73301' },
    { city: 'Boston', zip: '02108' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !zip) return;
    onSaveLocation(city, zip);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-purple-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-sm">Choose your delivery location</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-gray-600">
            Delivery options and speeds may vary based on your location. Select a city or enter your zip code.
          </p>

          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.zip}
                type="button"
                onClick={() => {
                  setCity(p.city);
                  setZip(p.zip);
                }}
                className={`py-1.5 px-3 rounded-lg border text-xs font-semibold transition ${
                  zip === p.zip
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p.city} ({p.zip})
              </button>
            ))}
          </div>

          <form onSubmit={handleSave} className="space-y-3 pt-2 border-t border-gray-100">
            <div>
              <label htmlFor="delivery-city" className="font-semibold text-gray-700 block mb-1">City</label>
              <input
                id="delivery-city"
                type="text"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="delivery-zip" className="font-semibold text-gray-700 block mb-1">Postal / Zip Code</label>
              <input
                id="delivery-zip"
                type="text"
                autoComplete="postal-code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md cursor-pointer"
            >
              Apply Location
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
