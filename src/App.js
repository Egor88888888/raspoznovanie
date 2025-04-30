import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import ConsentRevocationPage from './pages/ConsentRevocationPage';
import ConsentConfirmationPage from './pages/ConsentConfirmationPage';
import UserAccountPage from './pages/UserAccountPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consent/revoke" element={<ConsentRevocationPage />} />
          <Route path="/consent/confirmation" element={<ConsentConfirmationPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="*" element={
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">404 - Страница не найдена</h1>
              <p className="text-xl text-gray-600">Извините, запрашиваемая страница не существует.</p>
            </div>
          } />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
