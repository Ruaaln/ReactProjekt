import client from './client';

export const fetchCities = async () => {
  const { data } = await client.get('/api/cities');
  return data;
};
