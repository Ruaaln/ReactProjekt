import client from './client';

export const fetchAds = async () => {
  const { data } = await client.get('/api/ads');
  return data;
};
