import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.js';
import type { WatchListWithWallets, Wallet } from '../types.js';
import Header from '../components/Header.js';
import Card from '../components/Card.js';
import Button from '../components/Button.js';
import Modal from '../components/Modal.js';
import Input from '../components/Input.js';
import { ToastContainer } from '../components/Toast.js';

export default function WatchlistsPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [watchlists, setWatchlists] = useState<WatchListWithWallets[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Modals state
  const [isNewWatchlistOpen, setIsNewWatchlistOpen] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const [targetWatchlistId, setTargetWatchlistId] = useState<string>('');
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [newWalletNickname, setNewWalletNickname] = useState('');
  const [newWalletChain, setNewWalletChain] = useState('Base');

  const [toasts, setToasts] = useState<Array<{ id: number, message: string, type: 'success'|'error', onClose: () => void }>>([]);

  useEffect(() => {
    if (user) fetchWatchlists();
  }, [user]);

  const addToast = (message: string, type: 'success'|'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, onClose: () => setToasts(t => t.filter(x => x.id !== id)) }]);
  };

  const fetchWatchlists = async () => {
    try {
      if (window.api?.getWatchlists && user) {
        const data = await window.api.getWatchlists(user.id);
        setWatchlists(data);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load watchlists', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim() || !user) return;
    try {
      if (window.api?.createWatchlist) {
        await window.api.createWatchlist({ name: newWatchlistName.trim(), userId: user.id });
        await fetchWatchlists();
        setIsNewWatchlistOpen(false);
        setNewWatchlistName('');
        addToast('Watchlist created!', 'success');
      }
    } catch (err) {
      addToast('Failed to create watchlist', 'error');
    }
  };

  const handleDeleteWatchlist = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this watchlist?')) return;
    try {
      if (window.api?.deleteWatchlist) {
        await window.api.deleteWatchlist(id);
        await fetchWatchlists();
        addToast('Watchlist deleted', 'success');
      }
    } catch (err) {
      addToast('Failed to delete watchlist', 'error');
    }
  };

  const handleAddWallet = async () => {
    if (!newWalletAddress.trim() || !targetWatchlistId) return;
    try {
      if (window.api?.addWallet) {
        await window.api.addWallet({
          address: newWalletAddress.trim(),
          nickname: newWalletNickname.trim() || 'Unnamed',
          blockchain: newWalletChain,
          watchListId: targetWatchlistId
        });
        await fetchWatchlists();
        setIsAddWalletOpen(false);
        setNewWalletAddress('');
        setNewWalletNickname('');
        addToast('Wallet added!', 'success');
      }
    } catch (err) {
      addToast('Failed to add wallet', 'error');
    }
  };

  const handleRemoveWallet = async (id: string) => {
    if (!confirm('Remove this wallet?')) return;
    try {
      if (window.api?.removeWallet) {
        await window.api.removeWallet(id);
        await fetchWatchlists();
        addToast('Wallet removed', 'success');
      }
    } catch (err) {
      addToast('Failed to remove wallet', 'error');
    }
  };

  const openAddWallet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetWatchlistId(id);
    setIsAddWalletOpen(true);
  };

  return (
    <div className="page-container">
      <div className="page-bg-glow" />
      <Header />
      
      <main className="watchlists-content">
        <Button variant="secondary" onClick={() => navigate('/menu')} style={{ marginBottom: '2rem' }}>
          ← Back
        </Button>

        <div className="watchlists-header">
          <h2 style={{ fontSize: '2rem' }}>Your Watchlists</h2>
          <Button variant="primary" onClick={() => setIsNewWatchlistOpen(true)}>+ New Watchlist</Button>
        </div>

        {loading ? (
          <div>Loading watchlists...</div>
        ) : watchlists.length === 0 ? (
          <div className="empty-state">
            <h3>No watchlists yet.</h3>
            <p>Create your first one to start tracking wallets!</p>
          </div>
        ) : (
          <div className="watchlists-list">
            {watchlists.map(wl => (
              <Card key={wl.id} className="watchlist-card">
                <div 
                  className="watchlist-header" 
                  onClick={() => setExpandedId(expandedId === wl.id ? null : wl.id)}
                >
                  <div className="watchlist-info">
                    <h3>{wl.name}</h3>
                    <div className="watchlist-count">{wl.wallets?.length || 0} wallets</div>
                  </div>
                  <div className="watchlist-actions">
                    <Button variant="secondary" onClick={(e: React.MouseEvent) => openAddWallet(wl.id, e)}>Add Wallet</Button>
                    <Button variant="danger" onClick={(e: React.MouseEvent) => handleDeleteWatchlist(wl.id, e)}>Delete</Button>
                  </div>
                </div>

                {expandedId === wl.id && (
                  <div className="wallet-list">
                    {wl.wallets?.length > 0 ? wl.wallets.map((w: Wallet) => (
                      <div key={w.id} className="wallet-item">
                        <div className="wallet-info">
                          <span className="wallet-nickname">{w.nickname} <span style={{color:'var(--text-secondary)', fontSize:'0.75rem', marginLeft:'0.5rem'}}>{w.blockchain}</span></span>
                          <span className="wallet-address">{w.address}</span>
                        </div>
                        <Button variant="secondary" onClick={() => handleRemoveWallet(w.id)} style={{ padding: '0.5rem' }}>✕</Button>
                      </div>
                    )) : (
                      <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No wallets in this watchlist</div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <Modal isOpen={isNewWatchlistOpen} onClose={() => setIsNewWatchlistOpen(false)} title="New Watchlist">
        <Input 
          label="Watchlist Name" 
          value={newWatchlistName} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWatchlistName(e.target.value)} 
          placeholder="e.g. Whales" 
          autoFocus 
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <Button variant="secondary" onClick={() => setIsNewWatchlistOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateWatchlist} disabled={!newWatchlistName.trim()}>Create</Button>
        </div>
      </Modal>

      <Modal isOpen={isAddWalletOpen} onClose={() => setIsAddWalletOpen(false)} title="Add Wallet">
        <Input 
          label="Wallet Address" 
          value={newWalletAddress} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWalletAddress(e.target.value)} 
          placeholder="0x..." 
        />
        <Input 
          label="Nickname" 
          value={newWalletNickname} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWalletNickname(e.target.value)} 
          placeholder="e.g. Vitalik" 
        />
        <div className="input-group">
          <label className="input-label">Blockchain</label>
          <select 
            className="input" 
            value={newWalletChain} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewWalletChain(e.target.value)}
          >
            <option value="Base">Base</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Optimism">Optimism</option>
            <option value="Arbitrum">Arbitrum</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <Button variant="secondary" onClick={() => setIsAddWalletOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddWallet} disabled={!newWalletAddress.trim()}>Add</Button>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
