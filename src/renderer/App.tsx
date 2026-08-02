import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext.js';
import LoginPage from './pages/LoginPage.js';
import MenuPage from './pages/MenuPage.js';
import BalancePage from './pages/BalancePage.js';
import WatchlistsPage from './pages/WatchlistsPage.js';

export default function App() {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/balance" element={<BalancePage />} />
          <Route path="/watchlists" element={<WatchlistsPage />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}
