import client from './client';

export const fetchCategories = async () => {
  const { data } = await client.get('/api/categories');
  return data;
};
