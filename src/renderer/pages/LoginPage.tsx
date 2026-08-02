import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.js';
import type { User } from '../types.js';
import Card from '../components/Card.js';
import Modal from '../components/Modal.js';
import Input from '../components/Input.js';
import Button from '../components/Button.js';

export default function LoginPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if (window.api?.getUsers) {
        const data = await window.api.getUsers();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user: User) => {
    setUser(user);
    navigate('/menu');
  };

  const handleCreateUser = async () => {
    if (!newUsername.trim()) return;
    try {
      if (window.api?.createUser) {
        const newUser = await window.api.createUser(newUsername.trim());
        setUsers([...users, newUser]);
        setIsModalOpen(false);
        setNewUsername('');
        handleUserSelect(newUser);
      }
    } catch (error) {
      console.error('Failed to create user', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-bg-glow" />
      <div className="login-page">
        <div className="login-title-container">
          <h1 className="login-title gradient-text">Watchflower X9</h1>
          <p className="login-subtitle">Select your profile</p>
        </div>

        {loading ? (
          <div style={{ padding: '2rem' }}>Loading profiles...</div>
        ) : (
          <div className="login-users-grid">
            {users.map(user => (
              <Card 
                key={user.id} 
                className="user-card" 
                onClick={() => handleUserSelect(user)}
                glow
              >
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="user-name">{user.username}</div>
              </Card>
            ))}
            
            <Card 
              className="user-card" 
              onClick={() => setIsModalOpen(true)}
            >
              <div className="user-avatar" style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border)' }}>
                +
              </div>
              <div className="user-name">Create User</div>
            </Card>
          </div>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Create New User"
        >
          <Input 
            label="Username" 
            value={newUsername} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
            placeholder="Enter username"
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateUser} disabled={!newUsername.trim()}>Create</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
