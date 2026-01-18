import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchPlaceById } from '../../../api/places';
import formatPhotoUrl from '../../../utils/formatPhotoUrl';

export default function PlaceDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [place, setPlace] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const data = await fetchPlaceById(id);
        setPlace(data);
      } catch (error) {
        setHasError(true);
      }
    };
    loadPlace();
  }, [id]);

  if (hasError) {
    return (
      <main className="page">
        <div className="container">
          <p className="muted">{t('errors.notFound')}</p>
        </div>
      </main>
    );
  }

  if (!place) {
    return (
      <main className="page">
        <div className="container">
          <p className="muted">{t('detail.loading')}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <h2 className="section-title">{place.title}</h2>
        <div className="detail-hero">
          {place.photos?.map((photo) => (
            <img key={photo} src={formatPhotoUrl(photo)} alt={place.title} className="card" />
          ))}
        </div>
        <div className="detail-info">
          <section className="card" style={{ padding: '24px' }}>
            <h3>{t('detail.overview')}</h3>
            <p className="muted">{place.description}</p>
          </section>
          <section className="card" style={{ padding: '24px' }}>
            <h3>{t('detail.address')}</h3>
            <p className="muted">{place.address}</p>
          </section>
          <section className="card" style={{ padding: '24px' }}>
            <h3>{t('detail.amenities')}</h3>
            <div className="tag-list">
              {(place.amenities || []).map((amenity) => (
                <span key={amenity} className="badge">
                  {amenity}
                </span>
              ))}
            </div>
          </section>
          <section className="card" style={{ padding: '24px' }}>
            <h3>{t('detail.hours')}</h3>
            <p className="muted">{place.workingHours}</p>
          </section>
          <section className="card" style={{ padding: '24px' }}>
            <h3>{t('detail.rating')}</h3>
            <p className="muted">{place.rating}</p>
          </section>
          <section className="card" style={{ padding: '24px' }}>
            <h3>{t('detail.views')}</h3>
            <p className="muted">{place.views}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
