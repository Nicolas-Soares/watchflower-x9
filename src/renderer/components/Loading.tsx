import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Loading({ size = 'md' }: LoadingProps) {
  return <div className={`loading-spinner loading-${size}`} />;
}
