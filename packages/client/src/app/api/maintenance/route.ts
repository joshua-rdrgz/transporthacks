import { NextResponse } from 'next/server';
import { getUserPreferences } from '@/services/apiPreferences';
import { predictMaintenance } from '@/services/apiMaintenance';

export async function POST(request: Request) {
  const userPreferences = await getUserPreferences();
  if (!userPreferences)
    return NextResponse.json('Error fetching user preferences');

  const input = {
    buying_price: userPreferences.carBuyingPrice,
    number_of_doors: userPreferences.numDoors,
    number_of_seats: userPreferences.numSeats,
    luggage_boot_size: userPreferences.luggageBootSize,
    safety_rating: userPreferences.safetyRating,
    popularity: userPreferences.popularity,
  };

  const result = await predictMaintenance<typeof input>(input);
  if (!result) return NextResponse.json('Error predicting maintenance');

  return NextResponse.json(result);
}
