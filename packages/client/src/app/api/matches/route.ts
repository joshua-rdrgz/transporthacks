import { NextResponse } from 'next/server';
import { findBestDriver } from '@/services/apiMatch';
import { getUserPreferences } from '@/services/apiPreferences';
import { getUserLocation } from '@/services/apiLocations';

export async function POST(request: Request) {
  const userPreferences = await getUserPreferences();
  if (!userPreferences)
    return NextResponse.json('Error fetching user preferences');

  const startLocation = await getUserLocation(userPreferences.startPointId);
  const endLocation = await getUserLocation(userPreferences.endPointId);

  if (!startLocation) return NextResponse.json('Error fetching startLocation');
  if (!endLocation) return NextResponse.json('Error fetching endLocation');

  const points = {
    startPoint: {
      lat: startLocation.lat,
      lng: startLocation.lng,
    },
    endPoint: {
      lat: endLocation.lat,
      lng: endLocation.lng,
    },
  };

  const bestDriver = await findBestDriver(points.startPoint, points.endPoint);
  if (!bestDriver) return NextResponse.json(null);

  return NextResponse.json(bestDriver);
}
