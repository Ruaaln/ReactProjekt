const BASE_URL = 'http://localhost:5000';

export default function formatPhotoUrl(photo) {
  if (!photo) {
    return '';
  }
  if (photo.startsWith('http')) {
    return photo;
  }
  if (photo.startsWith('/')) {
    return `${BASE_URL}${photo}`;
  }
  return `${BASE_URL}/${photo}`;
}
