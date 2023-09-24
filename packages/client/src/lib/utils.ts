import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type TLatLng = {
  lat: number;
  lng: number;
} | null;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLatLngForAddress(address: string) {
  const geoCodeUrl = new URL('https://maps.google.com/maps/api/geocode/json');

  const geoCodeUrlParams = new URLSearchParams();
  geoCodeUrlParams.append('address', address);
  geoCodeUrlParams.append(
    'key',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  );

  geoCodeUrl.search = geoCodeUrlParams.toString();

  const geocodeResponse = await axios.get(geoCodeUrl.toString());
  const latlng = geocodeResponse.data.results.at(0).geometry.location;

  return latlng;
}

export async function getAddressFromLatLng(lat?: number, lng?: number) {
  if (!lat || !lng)
    return 'Unable to process coordinates, please pass both `lat` and `lng`.';

  const geoCodeUrl = new URL(
    'https://maps.googleapis.com/maps/api/geocode/json'
  );

  const geoCodeUrlParams = new URLSearchParams();
  geoCodeUrlParams.append('latlng', `${lat} ${lng}`);
  geoCodeUrlParams.append(
    'key',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  );

  geoCodeUrl.search = geoCodeUrlParams.toString();

  const geocodeResponse = await axios.get(geoCodeUrl.toString());
  const formattedAddress = geocodeResponse.data.results[0].formatted_address;

  return formattedAddress;
}
