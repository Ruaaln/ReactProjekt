import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchFeaturedPlaces, fetchPlaces } from '../../../api/places';
import { fetchAds } from '../../../api/ads';
import formatPhotoUrl from '../../../utils/formatPhotoUrl';

export default function HomePage() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState([]);
  const [places, setPlaces] = useState([]);
  const [ads, setAds] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredData, placesData, adsData] = await Promise.all([
          fetchFeaturedPlaces(),
          fetchPlaces(),
          fetchAds()
        ]);
        setFeatured(featuredData);
        setPlaces(placesData);
        setAds(adsData);
      } catch (error) {
        setHasError(true);
      }
    };
    loadData();
  }, []);

  return (
    <main className="page">
      <div className="container">
        {hasError && <p className="muted">{t('errors.loadFailed')}</p>}
        <section>
          <h2 className="section-title">{t('home.featured')}</h2>
          <div className="slider">
            {featured.map((place) => (
              <Link to={`/place/${place.id}`} className="card" key={place.id}>
                <img src={formatPhotoUrl(place.photos?.[0])} alt={place.title} />
                <div className="place-card-content">
                  <strong>{place.title}</strong>
                  <div className="place-card-meta">
                    <span>{place.city}</span>
                    <span>{place.rating} ★</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2 className="section-title">{t('home.ads')}</h2>
          <div className="ads-strip">
            {ads.map((ad) => (
              <div key={ad.id} className="ads-card">
                <strong>{ad.title}</strong>
                <p className="muted">{ad.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2 className="section-title">{t('home.places')}</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {places.map((place) => (
              <Link to={`/place/${place.id}`} className="card" key={place.id}>
                <img src={formatPhotoUrl(place.photos?.[0])} alt={place.title} />
                <div className="place-card-content">
                  <strong>{place.title}</strong>
                  <p className="muted">{place.category}</p>
                  <div className="place-card-meta">
                    <span>{place.city}</span>
                    <span>{place.rating} ★</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
