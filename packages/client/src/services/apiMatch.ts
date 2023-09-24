import axios from 'axios';

export const findBestDriver = async (
  startPoint: { lat: number; lng: number },
  endPoint: { lat: number; lng: number }
) => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_PYTHON_API_URL as string}/match_driver`,
    {
      startPlace_latitude: startPoint.lat,
      startPlace_longitude: startPoint.lng,
      endPlace_latitude: endPoint.lat,
      endPlace_longitude: endPoint.lng,
    }
  );

  if (result.status === 422) {
    const { detail } = result.data;
    console.log('🔥🔥🔥 ERROR 🔥🔥🔥 : ', detail);
  }

  console.log('result: ', result.data);
  return result.data;
};
