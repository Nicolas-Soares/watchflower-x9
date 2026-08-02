import React from 'react';
import Loading from './Loading.js';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  loading = false, 
  disabled,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClass = `btn btn-${variant} ${className}`;
  
  return (
    <button 
      className={baseClass} 
      disabled={disabled || loading} 
      {...props}
    >
      {loading ? <Loading size="sm" /> : null}
      {children}
    </button>
  );
}
