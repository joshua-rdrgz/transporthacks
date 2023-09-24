import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/services/apiAuth';
import { updateLocation } from './apiLocations';

export async function getUserPreferences() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const userPreferences = await prisma.preference.findUnique({
      where: {
        userId: currentUser?.id,
      },
    });

    if (!userPreferences) return null;

    return userPreferences;
  } catch (err: any) {
    console.error('🔥🔥🔥 ERROR 🔥🔥🔥 : ', err);
    return null;
  }
}

export async function updateUserPreferences(
  userId: string,
  updatedPreferences: any
) {
  try {
    const dbPreferences = await prisma.preference.findUnique({
      where: { userId },
    });

    if (!dbPreferences) return null;

    await updateLocation(
      dbPreferences.startPointId,
      updatedPreferences.startPoint
    );
    await updateLocation(dbPreferences.endPointId, updatedPreferences.endPoint);

    const userPreferences = await prisma.preference.update({
      where: { userId },
      data: {
        status: updatedPreferences.status,
      },
    });

    if (!userPreferences) return null;

    return userPreferences;
  } catch (err: any) {
    console.error('🔥🔥🔥 ERROR 🔥🔥🔥 : ', err);
    return null;
  }
}
