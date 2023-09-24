import prisma from '@/lib/prisma';
import { getCurrentUser } from './apiAuth';
import { TLatLng } from '@/lib/utils';

export async function getUserLocation(id: string) {
  try {
    const location = await prisma.location.findUnique({
      where: { id },
    });

    if (!location) return null;

    return location;
  } catch (err: any) {
    console.error('🔥🔥🔥 ERROR 🔥🔥🔥 : ', err);
    return null;
  }
}

export async function createUserLocation(location: any) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const createdLocation = await prisma.location.create({
      data: location,
    });

    return createdLocation;
  } catch (err: any) {
    console.error('🔥🔥🔥 ERROR 🔥🔥🔥 : ', err);
    return null;
  }
}

export async function updateLocation(id: string, location: any) {
  try {
    const updatedLocation = await prisma.location.update({
      where: {
        id,
      },
      data: location,
    });
    console.log('updatedLocation: ', updatedLocation);

    if (!updatedLocation) return null;

    return updatedLocation;
  } catch (err: any) {
    console.error('🔥🔥🔥 ERROR 🔥🔥🔥 : ', err);
    return null;
  }
}
