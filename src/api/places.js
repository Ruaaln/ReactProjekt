import client from './client';

export const fetchPlaces = async () => {
  const { data } = await client.get('/api/places');
  return data;
};

export const fetchPlaceById = async (id) => {
  const { data } = await client.get(`/api/places/${id}`);
  return data;
};

export const fetchFeaturedPlaces = async () => {
  const { data } = await client.get('/api/places/featured');
  return data;
};
