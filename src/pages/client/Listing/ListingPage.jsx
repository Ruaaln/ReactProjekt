import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchPlaces } from '../../../api/places';
import { fetchCategories } from '../../../api/categories';
import { fetchCities } from '../../../api/cities';
import formatPhotoUrl from '../../../utils/formatPhotoUrl';

const PAGE_SIZE = 6;

export default function ListingPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [hasError, setHasError] = useState(false);

  const selectedCategory = searchParams.get('category') || '';
  const selectedCity = searchParams.get('city') || '';
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [placesData, categoriesData, citiesData] = await Promise.all([
          fetchPlaces(),
          fetchCategories(),
          fetchCities()
        ]);
        setPlaces(placesData);
        setCategories(categoriesData);
        setCities(citiesData);
      } catch (error) {
        setHasError(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const filteredPlaces = useMemo(() => {
    return places
      .filter((place) => (selectedCategory ? place.category === selectedCategory : true))
      .filter((place) => (selectedCity ? place.city === selectedCity : true))
      .filter((place) =>
        searchTerm ? place.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
      );
  }, [places, selectedCategory, selectedCity, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredPlaces.length / PAGE_SIZE));
  const paginatedPlaces = filteredPlaces.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const handlePageChange = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', nextPage);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <main className="page">
      <div className="container">
        <h2 className="section-title">{t('listing.title')}</h2>
        {hasError && <p className="muted">{t('errors.loadFailed')}</p>}
        <div className="filter-bar">
          <select
            className="select"
            value={selectedCategory}
            onChange={(event) => updateParam('category', event.target.value)}
          >
            <option value="">{t('filters.category')}</option>
            {categories.map((category) => (
              <option key={category.id || category} value={category.name || category}>
                {category.name || category}
              </option>
            ))}
          </select>
          <select
            className="select"
            value={selectedCity}
            onChange={(event) => updateParam('city', event.target.value)}
          >
            <option value="">{t('filters.city')}</option>
            {cities.map((city) => (
              <option key={city.id || city} value={city.name || city}>
                {city.name || city}
              </option>
            ))}
          </select>
          <input
            className="input"
            value={searchTerm}
            onChange={(event) => updateParam('q', event.target.value)}
            placeholder={t('search.placeholder')}
          />
          <button type="button" className="btn btn-outline" onClick={clearFilters}>
            {t('filters.clear')}
          </button>
        </div>

        {paginatedPlaces.length === 0 ? (
          <p className="muted">{t('listing.noResults')}</p>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {paginatedPlaces.map((place) => (
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
        )}

        <div className="pagination">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {t('pagination.prev')}
          </button>
          <span className="badge">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            {t('pagination.next')}
          </button>
        </div>
      </div>
    </main>
  );
}
