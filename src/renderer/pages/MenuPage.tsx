import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.js';
import Header from '../components/Header.js';
import Card from '../components/Card.js';

export default function MenuPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="page-container">
      <div className="page-bg-glow" />
      <Header />
      
      <main className="menu-page">
        <div className="menu-grid">
          <Card className="menu-card" glow onClick={() => navigate('/balance')}>
            <div className="menu-icon">💰</div>
            <h2 className="menu-title gradient-text">Check Balance</h2>
            <p className="menu-description">Query wallet balance on Base chain</p>
          </Card>

          <Card className="menu-card" glow onClick={() => navigate('/watchlists')}>
            <div className="menu-icon">📋</div>
            <h2 className="menu-title gradient-text">Watchlists</h2>
            <p className="menu-description">Manage your wallet watchlists</p>
          </Card>

          <Card className="menu-card" onClick={logout}>
            <div className="menu-icon">🚪</div>
            <h2 className="menu-title" style={{ color: 'var(--accent-pink)' }}>Logout</h2>
            <p className="menu-description">Return to user selection</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
