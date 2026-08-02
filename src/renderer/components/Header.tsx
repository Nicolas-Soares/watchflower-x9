import React from 'react';
import { useUser } from '../context/UserContext.js';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <h1 className="header-title gradient-text">Watchflower X9</h1>
      {user && (
        <div className="header-subtitle">
          Logged as: <span style={{ color: 'var(--text-primary)' }}>{user.username}</span>
        </div>
      )}
    </header>
  );
}
