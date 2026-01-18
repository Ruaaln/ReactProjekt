import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/client/Home/HomePage.jsx';
import ListingPage from './pages/client/Listing/ListingPage.jsx';
import PlaceDetailPage from './pages/client/PlaceDetail/PlaceDetailPage.jsx';
import NotFoundPage from './pages/client/NotFound/NotFoundPage.jsx';
import ClientLayout from './components/client/ClientLayout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminLoginPage from './pages/admin/Login/AdminLoginPage.jsx';
import AdminPlacesPage from './pages/admin/Places/AdminPlacesPage.jsx';
import AdminPlaceFormPage from './pages/admin/PlaceForm/AdminPlaceFormPage.jsx';
import AdminRoute from './components/admin/AdminRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/place/:id" element={<PlaceDetailPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/places" replace />} />
        <Route path="places" element={<AdminPlacesPage />} />
        <Route path="places/new" element={<AdminPlaceFormPage mode="create" />} />
        <Route path="places/:id/edit" element={<AdminPlaceFormPage mode="edit" />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
