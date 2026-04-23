'use client';

import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapView({ 
  latitude, 
  longitude,
  height = "300px"
}: { 
  latitude: number, 
  longitude: number,
  height?: string
}) {
  if (!MAPBOX_TOKEN) return null;

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden border shadow-sm">
      <Map
        initialViewState={{
          latitude,
          longitude,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactive={false}
      >
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
          <MapPin className="text-green-600" size={32} fill="currentColor" fillOpacity={0.2} />
        </Marker>
      </Map>
    </div>
  );
}
