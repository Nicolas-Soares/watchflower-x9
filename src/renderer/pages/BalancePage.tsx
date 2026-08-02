import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Card from '../components/Card.js';
import Input from '../components/Input.js';
import Button from '../components/Button.js';

export default function BalancePage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ address: string; balanceEth: string } | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckBalance = async () => {
    if (!address.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (window.api?.checkBalance) {
        const data = await window.api.checkBalance(address.trim());
        setResult(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch balance. Invalid address?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-bg-glow" />
      <Header />
      
      <main className="balance-page-content">
        <div className="balance-card-container">
          <Button variant="secondary" onClick={() => navigate('/menu')} style={{ alignSelf: 'flex-start' }}>
            ← Back
          </Button>

          <Card className="balance-card" glow>
            <h2 style={{ marginBottom: '1.5rem' }}>Check Balance</h2>
            
            <Input 
              label="Wallet Address" 
              placeholder="0x..." 
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            />
            
            {error && <div style={{ color: 'var(--accent-red)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

            <Button 
              variant="primary" 
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={handleCheckBalance}
              loading={loading}
              disabled={!address.trim()}
            >
              Check Balance
            </Button>
          </Card>

          {result && (
            <div className="balance-result slideUp">
              <div className="balance-label">Balance</div>
              <div className="balance-amount gradient-text">{result.balanceEth} ETH</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', wordBreak: 'break-all' }}>
                {result.address}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
