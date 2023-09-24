'use client';

import { TLatLng } from '@/lib/utils';
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  MarkerF,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';
import { useState } from 'react';

interface IDisplayMapProps {
  startPoint: Exclude<TLatLng, null>;
  endPoint: Exclude<TLatLng, null>;
  directions?: any;
}

export const DisplayMap: React.FC<IDisplayMapProps> = ({
  startPoint,
  endPoint,
  directions,
}) => {
  const [response, setResponse] = useState<any | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName='w-full h-60 rounded'
      center={startPoint}
      zoom={11}
    >
      <MarkerF position={startPoint} />
      <MarkerF position={endPoint} />
      {response !== null && (
        <DirectionsRenderer options={{ directions: response }} />
      )}
      <DirectionsService
        options={{
          origin: startPoint,
          destination: endPoint,
          // @ts-ignore
          travelMode: 'DRIVING',
        }}
        callback={(result, status) => {
          if (result !== null) {
            if (status === 'OK') {
              setResponse(result);
            } else {
              console.log('result: ', result);
            }
          }
        }}
      />
    </GoogleMap>
  ) : (
    <div>Loading....</div>
  );
};
