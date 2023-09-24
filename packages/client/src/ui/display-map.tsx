'use client';

import { TLatLng } from '@/lib/utils';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface IDisplayMapProps {
  startPoint: Exclude<TLatLng, null>;
  endPoint: Exclude<TLatLng, null>;
}

const defaultStartPoint = { lat: 40.7128, lng: -74.006 }; // New York City

export const DisplayMap: React.FC<IDisplayMapProps> = ({
  startPoint,
  endPoint,
}) => {
  const [response, setResponse] = useState<any | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: startPoint || defaultStartPoint,
          destination: endPoint,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setResponse(result);
          } else {
            console.log('ERROR FETCHING DIRECTIONS: ', status);
          }
        }
      );
    }
  }, [isLoaded, startPoint, endPoint]);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName='w-full h-60 rounded'
      center={startPoint || defaultStartPoint}
      zoom={11}
    >
      {startPoint && <MarkerF position={startPoint} />}
      {endPoint && <MarkerF position={endPoint} />}
      {response !== null && (
        <DirectionsRenderer options={{ directions: response }} />
      )}
    </GoogleMap>
  ) : (
    <div>Loading....</div>
  );
};
