import adminClient from './adminClient';

export const fetchAdminPlaces = async () => {
  const { data } = await adminClient.get('/api/admin/places');
  return data;
};

export const createAdminPlace = async (payload) => {
  const { data } = await adminClient.post('/api/admin/places', payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const updateAdminPlace = async (id, payload) => {
  const { data } = await adminClient.put(`/api/admin/places/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const deleteAdminPlace = async (id) => {
  const { data } = await adminClient.delete(`/api/admin/places/${id}`);
  return data;
};
