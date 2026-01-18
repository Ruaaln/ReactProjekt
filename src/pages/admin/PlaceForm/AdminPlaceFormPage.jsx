import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createAdminPlace, updateAdminPlace } from '../../../api/adminPlaces';
import { fetchPlaceById } from '../../../api/places';
import { fetchCategories } from '../../../api/categories';
import { fetchCities } from '../../../api/cities';

const initialState = {
  title: '',
  description: '',
  category: '',
  city: '',
  address: '',
  amenities: '',
  workingHours: '',
  rating: '',
  views: ''
};

export default function AdminPlaceFormPage({ mode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formState, setFormState] = useState(initialState);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const loadMetadata = async () => {
      const [categoriesData, citiesData] = await Promise.all([
        fetchCategories(),
        fetchCities()
      ]);
      setCategories(categoriesData);
      setCities(citiesData);
    };
    loadMetadata();
  }, []);

  useEffect(() => {
    const loadPlace = async () => {
      if (mode === 'edit' && id) {
        const data = await fetchPlaceById(id);
        setFormState({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          city: data.city || '',
          address: data.address || '',
          amenities: (data.amenities || []).join(', '),
          workingHours: data.workingHours || '',
          rating: data.rating || '',
          views: data.views || ''
        });
      }
    };
    loadPlace();
  }, [mode, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (photos.length > 0) {
      Array.from(photos).forEach((photo) => {
        formData.append('photos', photo);
      });
    }

    if (mode === 'edit') {
      await updateAdminPlace(id, formData);
    } else {
      await createAdminPlace(formData);
    }
    navigate('/admin/places');
  };

  return (
    <section>
      <h2 className="section-title">
        {mode === 'edit' ? t('admin.form.editTitle') : t('admin.form.createTitle')}
      </h2>
      <form className="card" style={{ padding: '24px' }} onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label className="muted" htmlFor="title">
              {t('admin.form.fields.title')}
            </label>
            <input
              id="title"
              name="title"
              className="input"
              value={formState.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="muted" htmlFor="category">
              {t('admin.form.fields.category')}
            </label>
            <select
              id="category"
              name="category"
              className="select"
              value={formState.category}
              onChange={handleChange}
              required
            >
              <option value="">{t('admin.form.fields.category')}</option>
              {categories.map((category) => (
                <option key={category.id || category} value={category.name || category}>
                  {category.name || category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="muted" htmlFor="city">
              {t('admin.form.fields.city')}
            </label>
            <select
              id="city"
              name="city"
              className="select"
              value={formState.city}
              onChange={handleChange}
              required
            >
              <option value="">{t('admin.form.fields.city')}</option>
              {cities.map((city) => (
                <option key={city.id || city} value={city.name || city}>
                  {city.name || city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="muted" htmlFor="address">
              {t('admin.form.fields.address')}
            </label>
            <input
              id="address"
              name="address"
              className="input"
              value={formState.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="muted" htmlFor="rating">
              {t('admin.form.fields.rating')}
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              className="input"
              value={formState.rating}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="muted" htmlFor="views">
              {t('admin.form.fields.views')}
            </label>
            <input
              id="views"
              name="views"
              type="number"
              className="input"
              value={formState.views}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="muted" htmlFor="workingHours">
              {t('admin.form.fields.hours')}
            </label>
            <input
              id="workingHours"
              name="workingHours"
              className="input"
              value={formState.workingHours}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="muted" htmlFor="amenities">
              {t('admin.form.fields.amenities')}
            </label>
            <input
              id="amenities"
              name="amenities"
              className="input"
              value={formState.amenities}
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label className="muted" htmlFor="description">
            {t('admin.form.fields.description')}
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="textarea"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <label className="muted" htmlFor="photos">
            {t('admin.form.fields.photos')}
          </label>
          <input
            id="photos"
            type="file"
            multiple
            onChange={(event) => setPhotos(event.target.files)}
          />
        </div>
        <button type="submit" className="btn" style={{ marginTop: '24px' }}>
          {t('admin.form.submit')}
        </button>
      </form>
    </section>
  );
}
