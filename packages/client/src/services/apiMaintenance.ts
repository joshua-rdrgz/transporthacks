import axios from 'axios';

export const predictMaintenance = async <T>(userPreferences: T) => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/predict_maintenance`,
    userPreferences
  );

  if (result.status === 422) {
    const { detail } = result.data;
    console.log('🔥🔥🔥 ERROR 🔥🔥🔥 : ', detail);
  }

  console.log('result: ', result.data);
  return result.data;
};
