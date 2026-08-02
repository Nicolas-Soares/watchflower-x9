import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', glow = false, onClick }: CardProps) {
  const classes = `card ${glow ? 'card-glow' : ''} ${className}`;
  
  return (
    <div className={classes} onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      {children}
    </div>
  );
}
