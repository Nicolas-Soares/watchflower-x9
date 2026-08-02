import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
}

// Global Toast Container helper
export function ToastContainer({ toasts }: { toasts: Array<{ id: number, message: string, type: 'success'|'error', onClose: () => void }> }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={t.onClose} />
      ))}
    </div>
  );
}
