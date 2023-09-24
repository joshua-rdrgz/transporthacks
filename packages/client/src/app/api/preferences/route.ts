import { getCurrentUser } from '@/services/apiAuth';
import { updateUserPreferences } from '@/services/apiPreferences';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const updatedPreferences = await request.json();

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json(null);
  if (currentUser.id !== updatedPreferences.userId)
    return NextResponse.json(null);

  const preferences = await updateUserPreferences(
    currentUser.id,
    updatedPreferences
  );

  return NextResponse.json(preferences);
}
