import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAdminPlaces, deleteAdminPlace } from '../../../api/adminPlaces';

export default function AdminPlacesPage() {
  const { t } = useTranslation();
  const [places, setPlaces] = useState([]);

  const loadPlaces = async () => {
    const data = await fetchAdminPlaces();
    setPlaces(data);
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleDelete = async (id) => {
    await deleteAdminPlace(id);
    await loadPlaces();
  };

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title">{t('admin.places.title')}</h2>
        <Link to="/admin/places/new" className="btn">
          {t('admin.places.create')}
        </Link>
      </div>
      {places.length === 0 ? (
        <p className="muted">{t('admin.places.empty')}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{t('admin.form.fields.title')}</th>
              <th>{t('admin.form.fields.city')}</th>
              <th>{t('admin.form.fields.category')}</th>
              <th>{t('admin.places.edit')}</th>
              <th>{t('admin.places.delete')}</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place.id}>
                <td>{place.title}</td>
                <td>{place.city}</td>
                <td>{place.category}</td>
                <td>
                  <Link to={`/admin/places/${place.id}/edit`} className="btn btn-outline">
                    {t('admin.places.edit')}
                  </Link>
                </td>
                <td>
                  <button type="button" className="btn" onClick={() => handleDelete(place.id)}>
                    {t('admin.places.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
