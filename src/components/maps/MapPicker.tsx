'use client';

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapPicker({ 
  initialLat, 
  initialLng, 
  onLocationSelect 
}: { 
  initialLat?: number, 
  initialLng?: number, 
  onLocationSelect: (lat: number, lng: number) => void 
}) {
  const [viewport, setViewport] = useState({
    latitude: initialLat || 3.848, // Default to Yaoundé
    longitude: initialLng || 11.502,
    zoom: 10
  });

  const [marker, setMarker] = useState({
    latitude: initialLat || 3.848,
    longitude: initialLng || 11.502
  });

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-64 bg-gray-100 flex items-center justify-center border rounded-lg text-gray-400">
        Mapbox token missing
      </div>
    );
  }

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setMarker({ latitude: lat, longitude: lng });
    onLocationSelect(lat, lng);
  };

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border">
      <Map
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        onClick={handleMapClick}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker 
            latitude={marker.latitude} 
            longitude={marker.longitude} 
            anchor="bottom"
        >
          <MapPin className="text-red-600" size={32} fill="currentColor" fillOpacity={0.2} />
        </Marker>
      </Map>
    </div>
  );
}
